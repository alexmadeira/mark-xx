import {
  TMasonryAvaliableGridSizes,
  type TMasonryContent,
  type TMasonryCurrentArea,
  type TMasonryGridSize,
  type TMasonryProps,
  ZMasonryAvaliableGridSizes,
  ZMasonryCurrentArea,
  ZMasonryProps,
} from '@/services/builder/masonry'

import { HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

import { Slot } from '@radix-ui/react-slot'
import _ from 'lodash'
import potpack from 'potpack'
import { twMerge } from 'tailwind-merge'

import { DataList } from './utils/data-list'

export class MasonryBuilder {
  private readonly _props: TMasonryProps
  private readonly _currentArea: TMasonryCurrentArea
  private readonly _avaliableGridSizes: TMasonryAvaliableGridSizes

  private readonly _grid = new DataList<TMasonryGridSize>()
  private readonly _gridContents = new DataList<TMasonryContent>()
  private readonly _fillItensGrid = new DataList<TMasonryGridSize>()
  private readonly _noRequiredGrid = new DataList<TMasonryGridSize>()

  protected constructor(props: TMasonryProps) {
    this._props = ZMasonryProps.parse(props)
    this._currentArea = ZMasonryCurrentArea.parse({ maxArea: props.area })
    this._avaliableGridSizes = ZMasonryAvaliableGridSizes.parse({})

    this.setup()
    this.buildAreaGrid()

    this.render = this.render.bind(this)
  }

  static create(props: TMasonryProps) {
    return new MasonryBuilder(props)
  }

  private setup() {
    this.setAvaliableSizes()
  }

  private buildAreaGrid() {
    // if (!this.area) return

    this.calculateRequiredGrid()
    this.calculateNoRequiredGrid()
    this.calculateGrid()
    this.calculateContents()
  }

  private setAvaliableSizes() {
    const fillItemKey = `${this.fillItem.w}x${this.fillItem.h}`
    this._avaliableGridSizes[fillItemKey] = this.fillItem
    this._props.sizes.forEach((item) => {
      const key = `${item.w}x${item.h}`
      this._avaliableGridSizes[key] = item
    })
  }

  private get someAvaliableSize() {
    const key = _.sample(Object.keys(this._avaliableGridSizes))
    return this.takeAvaliableSize(key)
  }

  private takeAvaliableSize(key?: string) {
    if (!key) return this.fillItem
    if (this._avaliableGridSizes[key].limit === 0) return this.fillItem
    if (!this._avaliableGridSizes[key].limit) return this._avaliableGridSizes[key]

    this._avaliableGridSizes[key].limit--

    return this._avaliableGridSizes[key]
  }

  private get isFilled() {
    if (this.area) return _.gte(this.currentArea.size, this.area)
    return _.gte(this.currentArea.items, this.contents.length)
  }

  private fitSize(size: TMasonryGridSize) {
    if (!this.area) return size

    const totalArea = this.currentArea.size + size.h * size.w
    const fitttedSize = _.lte(totalArea, this.area) ? size : this.fillItem

    return fitttedSize
  }

  private someAvailableSizeFitted() {
    const avaliableSize = this.someAvaliableSize
    return this.fitSize(avaliableSize)
  }

  private calculateRequiredGrid() {
    if (!this.requiredItem) return

    this.currentArea.items += 1
    this.currentArea.size += this.requiredItem.h * this.requiredItem.w
  }

  private calculateNoRequiredGrid() {
    this._noRequiredGrid.clear()
    while (!this.isFilled) {
      const newSize = this.someAvailableSizeFitted()

      this._noRequiredGrid.add(newSize)
      this.currentArea.size += newSize.h * newSize.w
      this.currentArea.items += 1
    }
  }

  private calculateGrid() {
    this._grid.set(this.requiredItem).add(this._noRequiredGrid, this._fillItensGrid)
    potpack(this._grid)
  }

  private calculateContents() {
    const contentList = this.random
      ? _.sampleSize(this.contents, this._grid.length)
      : _.take(this.contents, this._grid.length)

    this._gridContents.set(contentList)
  }

  private gridWithLimitedArea(props: HTMLAttributes<HTMLHeadingElement>) {
    return (
      <div
        key={this.name}
        className="grid h-full w-full flex-1 grid-flow-row-dense gap-4 p-4 sm:auto-rows-[calc((100vw-1rem*11)/12)] sm:grid-cols-12"
      >
        {this._grid.map((item, i) => {
          const content = this._gridContents[i]
          if (!content) return null
          return (
            <Link
              key={`masonry-item-${i}`}
              to={this._gridContents[i]?.link || '#'}
              className={twMerge('group/masonry-item relative aspect-square sm:aspect-auto', item.className)}
            >
              {/* {item.h * item.w} */}
              <Slot {...props} {...content} className={twMerge(content.className, props.className)} />
            </Link>
          )
        })}
      </div>
    )
  }

  private get name() {
    return this._props.name
  }

  private get fillItem() {
    return this._props.fill
  }

  private get requiredItem() {
    return this._props.required
  }

  private get currentArea() {
    return this._currentArea
  }

  private set currentArea(props: Omit<TMasonryCurrentArea, 'maxArea'>) {
    this._currentArea.size = props.size ?? this._currentArea.size
    this._currentArea.items = props.items ?? this._currentArea.items
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

  public render(props: HTMLAttributes<HTMLHeadingElement>) {
    if (this.area) return this.gridWithLimitedArea(props)
    return this.gridWithLimitedArea(props)
  }
}
