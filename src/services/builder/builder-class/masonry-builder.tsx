import type {
  TMasonryAvaliableSizes,
  TMasonryContent,
  TMasonryGridItem,
  TMasonryProps,
} from '@/services/builder/masonry'

import { HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

import { Slot } from '@radix-ui/react-slot'
import _ from 'lodash'
import potpack from 'potpack'
import { twMerge } from 'tailwind-merge'

import { DataList } from './utils/data-list'

export class MasonryBuilder {
  private _currentArea = 0

  private readonly _grid = new DataList<TMasonryGridItem>()
  private readonly _gridContents = new DataList<TMasonryContent>()
  private readonly _fillItensGrid = new DataList<TMasonryGridItem>()
  private readonly _noRequiredGrid = new DataList<TMasonryGridItem>()

  private readonly _avaliableSizes: TMasonryAvaliableSizes = {}

  protected constructor(private readonly _props: TMasonryProps) {
    this.setup()
    this.buildAreaGrid()

    this.render = this.render.bind(this)
  }

  static create(props: TMasonryProps) {
    return new MasonryBuilder(props)
  }

  private setup() {
    this._currentArea = this.requiredArea

    this.setAvaliableSizes()
  }

  private buildAreaGrid() {
    if (!this.area) return

    this.calculateNoRequiredGrid()
    this.calculateFillGrid()
    this.calculateGrid()
    this.calculateContents()
  }

  private setAvaliableSizes() {
    const fillItemKey = `${this.fillItem.w}x${this.fillItem.h}`
    this._avaliableSizes[fillItemKey] = this.fillItem
    this._props.sizes.forEach((item) => {
      const key = `${item.w}x${item.h}`
      this._avaliableSizes[key] = item
    })
  }

  private someAvaliableSize() {
    const key = _.sample(Object.keys(this._avaliableSizes))
    if (!key) return this.fillItem

    const size = this._avaliableSizes[key]
    this.avaliableSizeUsed(key)

    return size
  }

  private avaliableSizeUsed(key: string) {
    if (!this._avaliableSizes[key].limit) return
    if (this._avaliableSizes[key].limit - 1 <= 0) {
      delete this._avaliableSizes[key]
      return
    }

    this._avaliableSizes[key].limit--
  }

  private calculateNoRequiredGrid() {
    if (!this.area) throw new Error('Area not provided')

    this._noRequiredGrid.clear()

    while (this._currentArea < this.area) {
      const someItem = this.someAvaliableSize()
      const someArea = someItem.h * someItem.w
      const item = this._currentArea + someArea < this.area ? someItem : this.fillItem

      this._noRequiredGrid.add(item)
      this._currentArea += item.h * item.w
    }
  }

  private calculateFillGrid() {
    if (!this.area) throw new Error('Area not provided')

    const dataArea = _.sum([this.requiredArea, this.noRequiredArea])
    const fillItens = _.fill(Array(Math.max(this.area - dataArea, 0)), this.fillItem)

    this._fillItensGrid.add(...fillItens)
  }

  private calculateGrid() {
    this._grid.set(this.requiredItem).add(this._noRequiredGrid, this._fillItensGrid)
    potpack(this._grid)
  }

  private calculateContents() {
    const contentList = this.random
      ? _.sampleSize(this.contents, this._grid.size)
      : _.take(this.contents, this._grid.size)

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
              <Slot {...props} {...content} className={twMerge(content.className, props.className)} />
            </Link>
          )
        })}
      </div>
    )
  }

  private gridWithoutArea(props: HTMLAttributes<HTMLHeadingElement>) {
    return (
      <div
        key={this.name}
        className="group/masonry-grid grid h-full w-full flex-1 grid-flow-row-dense gap-4 p-4 sm:auto-rows-[calc((100vw-1rem*11)/12)] sm:grid-cols-12"
      >
        {this.contents.map((item, i) => {
          const someSize = this.someAvaliableSize()

          return (
            <Link
              key={`masonry-item-${i}`}
              to={item?.link || '#'}
              className={twMerge('group/masonry-item', someSize.className)}
            >
              <Slot {...props} {...item} className={twMerge(item.className, props.className)} />
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

  private get noRequiredItems() {
    return this._noRequiredGrid
  }

  private get noRequiredArea() {
    return _.sumBy(this.noRequiredItems, (item) => item.h * item.w)
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

  private get requiredArea() {
    return _.chain(this._props.required)
      .at(['h', 'w'])
      .reduce((acc, v) => {
        if (_.isNumber(v) && v > 0) {
          if (!acc) return v
          return acc * v
        }
        return acc
      }, 0)
      .value()
  }

  public render(props: HTMLAttributes<HTMLHeadingElement>) {
    if (this.area) return this.gridWithLimitedArea(props)
    return this.gridWithoutArea(props)
  }
}
