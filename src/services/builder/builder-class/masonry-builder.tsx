import type {
  TMasonryAvaliableGridSizes,
  TMasonryContent,
  TMasonryContentWrapperProps,
  TMasonryCurrentArea,
  TMasonryGridSize,
  TMasonryProps,
  TMasonryRenderProps,
} from '@/services/builder/masonry'

import { Link } from 'react-router-dom'

import { Slot } from '@radix-ui/react-slot'
import _ from 'lodash'
import potpack from 'potpack'
import { twMerge } from 'tailwind-merge'

import { DataList } from '_SRV/utils/data-list'

export class MasonryBuilder {
  private contents: TMasonryContent[] = []
  private currentArea: TMasonryCurrentArea = { maxArea: 0, items: 0, size: 0 }
  private avaliableGridSizes: TMasonryAvaliableGridSizes = {}

  private readonly grid = new DataList<TMasonryGridSize>()
  private readonly gridContents = new DataList<TMasonryContent>()

  protected constructor(private readonly _props: TMasonryProps) {
    this.build()

    _.bindAll(this, ['render'])
  }

  static create(props: TMasonryProps) {
    return new MasonryBuilder(props)
  }

  private build() {
    this.buildPrepare()
    this.buildCurrentArea()
    this.buildAvaliableSizes()
    this.buildGrid()
  }

  private buildPrepare() {
    this.grid.clear()
    this.gridContents.clear()
    this.avaliableGridSizes = {}
  }

  private buildGrid() {
    this.buildGridItems()
    this.buildGridContents()
  }

  private buildCurrentArea() {
    this.currentArea = { maxArea: this.maxArea, items: 0, size: 0 }
  }

  private buildAvaliableSizes() {
    _.set(this.avaliableGridSizes, this.size(this.fill).key, this.fill)

    this.sizes.forEach((item) => _.set(this.avaliableGridSizes, this.size(item).key, item))
  }

  private buildGridItems() {
    if (this.required) {
      this.currentArea.items++
      this.currentArea.size += this.size(this.required).area
      this.grid.add(this.required)
    }

    while (!this.isFilled()) {
      const someSize = this.someAvailableSize()

      this.currentArea.items++
      this.currentArea.size += this.size(someSize).area

      this.grid.add(someSize)
    }
    potpack(this.grid)
  }

  private buildGridContents(customContents?: TMasonryContent[]) {
    const contents = customContents || this.contents

    if (!this.random) return this.gridContents.set(contents)
    return this.gridContents.set(_.shuffle(contents))
  }

  private isFilled() {
    if (this.maxArea) return _.gte(this.currentArea.size, this.maxArea)
    return _.gte(this.currentArea.items, this.contents.length)
  }

  private takeAvaliableSize(key?: string) {
    if (!key) return this.fill
    if (!this.avaliableGridSizes[key].limit) return this.avaliableGridSizes[key]

    const result = this.avaliableGridSizes[key]

    this.avaliableGridSizes[key].limit--
    if (this.avaliableGridSizes[key].limit === 0) delete this.avaliableGridSizes[key]

    return result
  }

  private someAvailableSize() {
    const someSize = this.takeAvaliableSize(_.sample(_.keys(this.avaliableGridSizes)))

    return this.fitSize(someSize)
  }

  private size(size: TMasonryGridSize) {
    return {
      key: `${size.w}x${size.h}`,
      area: size.h * size.w,
    }
  }

  private fitSize(size: TMasonryGridSize) {
    if (!this.maxArea) return size

    const probableTotalArea = this.currentArea.size + size.h * size.w

    return _.lte(probableTotalArea, this.maxArea) ? size : this.fill
  }

  private contentWrapper(props: TMasonryContentWrapperProps) {
    const Wrapper = props.link ? Link : 'div'

    return (
      <Wrapper
        {...props}
        key={props.key}
        to={props.link || '#'}
        data-size={`${props.w}x${props.h}`}
        className={twMerge('group/masonry-item relative aspect-square sm:aspect-auto', props.className)}
      />
    )
  }

  private get maxArea() {
    return this._props.area || 0
  }

  private get name() {
    return this._props.name
  }

  private get fill() {
    return this._props.fill
  }

  private get sizes() {
    return this._props.sizes
  }

  private get required() {
    return this._props.required
  }

  private get random() {
    return this._props.random
  }

  public render({ contents, ...props }: TMasonryRenderProps) {
    this.buildGridContents(contents)

    return (
      <div
        key={this.name}
        className="group/masonry grid h-full w-full flex-1 grid-flow-row-dense gap-4 p-4 sm:auto-rows-[calc((100vw-1rem*11)/12)] sm:grid-cols-12"
      >
        {this.grid.slice(0, this.gridContents.length).map((size, i) => {
          return this.contentWrapper({
            ...size,
            key: `masonry-item-${i}`,
            link: this.gridContents[i].link,
            children: (
              <Slot
                {...props}
                {...this.gridContents[i].metaData}
                className={twMerge(this.gridContents[i].className, props.className)}
              />
            ),
          })
        })}
      </div>
    )
  }
}
