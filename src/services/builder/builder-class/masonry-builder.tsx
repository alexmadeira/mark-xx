import type {
  TMasonryAvaliableGridSizes,
  TMasonryContent,
  TMasonryContentWrapperProps,
  TMasonryCurrentArea,
  TMasonryGridSize,
  TMasonryProps,
  TMasonryRenderProps,
} from '@/services/builder/masonry'

import { ZMasonryAvaliableGridSizes, ZMasonryCurrentArea, ZMasonryProps } from '@/services/builder/masonry'

import { Link } from 'react-router-dom'

import { Slot } from '@radix-ui/react-slot'
import _ from 'lodash'
import potpack from 'potpack'
import { twMerge } from 'tailwind-merge'

import { DataList } from '_SRV/utils/data-list'

export class MasonryBuilder {
  private readonly _currentArea: TMasonryCurrentArea
  private readonly _avaliableGridSizes: TMasonryAvaliableGridSizes

  private readonly _gridSizes = new DataList<TMasonryGridSize>()
  private readonly _gridContents = new DataList<TMasonryContent>()
  private readonly _fillItensGrid = new DataList<TMasonryGridSize>()
  private readonly _noRequiredGrid = new DataList<TMasonryGridSize>()

  protected constructor(private readonly _props: TMasonryProps) {
    this._currentArea = ZMasonryCurrentArea.parse({ maxArea: _props.area })
    this._avaliableGridSizes = ZMasonryAvaliableGridSizes.parse({})

    this.render = this.render.bind(this)

    this.setup()
  }

  static create(props: TMasonryProps) {
    return new MasonryBuilder(ZMasonryProps.parse(props))
  }

  private setup() {
    this.buildAvaliableSizes()
    this.buildRequiredGrid()
    this.buildNoRequiredGrid()
    this.buildGrid()
    this.buildContents()
  }

  private buildAvaliableSizes() {
    const fillItemKey = `${this.fillItem.w}x${this.fillItem.h}`
    this._avaliableGridSizes[fillItemKey] = this.fillItem
    this._props.sizes.forEach((item) => {
      const key = `${item.w}x${item.h}`
      this._avaliableGridSizes[key] = item
    })
  }

  private buildRequiredGrid() {
    if (!this.requiredItem) return

    this.currentArea.items += 1
    this.currentArea.size += this.requiredItem.h * this.requiredItem.w
  }

  private buildNoRequiredGrid() {
    this._noRequiredGrid.clear()
    while (!this.isFilled) {
      const newSize = this.someAvailableSizeFitted

      this._noRequiredGrid.add(newSize)
      this.currentArea.size += newSize.h * newSize.w
      this.currentArea.items += 1
    }
  }

  private buildGrid() {
    this.gridSizes.set(this.requiredItem)
    this.gridSizes.add(this._noRequiredGrid, this._fillItensGrid)

    potpack(this.gridSizes)
  }

  private buildContents() {
    const contentList = this.random
      ? _.sampleSize(this.contents, this.gridSizes.length)
      : _.take(this.contents, this.gridSizes.length)

    this.gridContents.set(contentList)
  }

  private takeAvaliableSize(key?: string) {
    if (!key) return this.fillItem
    if (this._avaliableGridSizes[key].limit === 0) return this.fillItem
    if (!this._avaliableGridSizes[key].limit) return this._avaliableGridSizes[key]

    this._avaliableGridSizes[key].limit--

    return this._avaliableGridSizes[key]
  }

  private fitSize(size: TMasonryGridSize) {
    if (!this.area) return size

    const totalArea = this.currentArea.size + size.h * size.w
    const fitttedSize = _.lte(totalArea, this.area) ? size : this.fillItem

    return fitttedSize
  }

  private contentWrapper({ to, key, size, ...rest }: TMasonryContentWrapperProps) {
    const Wrapper = to ? Link : 'div'

    return (
      <Wrapper
        {...rest}
        key={key}
        to={to || '#'}
        data-size={`${size.w}x${size.h}`}
        className={twMerge('group/masonry-item relative aspect-square sm:aspect-auto', rest.className)}
      />
    )
  }

  private set currentArea(props: Omit<TMasonryCurrentArea, 'maxArea'>) {
    this._currentArea.size = props.size ?? this._currentArea.size
    this._currentArea.items = props.items ?? this._currentArea.items
  }

  private get isFilled() {
    if (this.area) return _.gte(this.currentArea.size, this.area)
    return _.gte(this.currentArea.items, this.contents.length)
  }

  private get someAvaliableSize() {
    const key = _.sample(Object.keys(this._avaliableGridSizes))
    return this.takeAvaliableSize(key)
  }

  private get someAvailableSizeFitted() {
    const avaliableSize = this.someAvaliableSize
    return this.fitSize(avaliableSize)
  }

  private get name() {
    return this._props.name
  }

  private get fillItem() {
    return this._props.fill
  }

  private get gridSizes() {
    return this._gridSizes
  }

  private get gridContents() {
    return this._gridContents
  }

  private get requiredItem() {
    return this._props.required
  }

  private get currentArea() {
    return this._currentArea
  }

  private get area() {
    return this._props.area
  }

  private get random() {
    return this._props.random
  }

  private get contents() {
    return this._props.contents
  }

  public render(props: TMasonryRenderProps) {
    const avalibleGridSizes = this.gridSizes.slice(0, this.gridContents.length)
    return (
      <div
        key={this.name}
        className="group/masonry grid h-full w-full flex-1 grid-flow-row-dense gap-4 p-4 sm:auto-rows-[calc((100vw-1rem*11)/12)] sm:grid-cols-12"
      >
        {avalibleGridSizes.map((size, i) => {
          return this.contentWrapper({
            size,
            key: `masonry-item-${i}`,
            to: this.gridContents[i].link,
            className: size.className,
            children: (
              <Slot
                {...props}
                {...this.gridContents[i]}
                className={twMerge(this.gridContents[i].className, props.className)}
              />
            ),
          })
        })}
      </div>
    )
  }
}
