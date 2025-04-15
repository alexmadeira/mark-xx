import type { TMasonryGridContent, TMasonryGridItem, TMasonryProps } from '@/services/builder/masonry'

import { Link } from 'react-router-dom'

import _ from 'lodash'
import potpack from 'potpack'
import { twMerge } from 'tailwind-merge'

export class MasonryBuilder {
  private _grid: TMasonryGridItem[] = []
  private _gridContents: TMasonryGridContent[] = []
  private _noRequiredGrid: TMasonryGridItem[] = []
  private _fillItensGrid: TMasonryGridItem[] = []

  protected constructor(private readonly _props: TMasonryProps) {
    this.buildAreaGrid()
    this.render = this.render.bind(this)
  }

  static create(props: TMasonryProps) {
    return new MasonryBuilder(props)
  }

  private buildAreaGrid() {
    if (!this.area) return

    this.calculateNoRequiredGrid()
    this.calculateFillGrid()
    this.calculateGrid()
    this.calculateContents()
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

  private get sizes() {
    return this._props.sizes
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

  private someSize() {
    return _.sample([this.fillItem, ...this.sizes])
  }

  private calculateNoRequiredGrid() {
    if (!this.area) throw new Error('Area not provided')

    this._noRequiredGrid = []
    let area = this.requiredItem.area

    while (area < this.area * 0.7) {
      const item = _.sample(this.sizes)
      if (!item) throw new Error('No available item')

      this._noRequiredGrid.push(item)
      area += item.area
    }
  }

  private calculateFillGrid() {
    if (!this.area) throw new Error('Area not provided')

    const dataArea = _.sumBy([this.requiredItem, ...this._noRequiredGrid], 'area')
    this._fillItensGrid = _.fill(Array(Math.max(this.area - dataArea, 0)), this.fillItem)
  }

  private calculateGrid() {
    this._grid = [this.requiredItem, ...this._noRequiredGrid, ...this._fillItensGrid]
    potpack(this._grid)
  }

  private calculateContents() {
    this._gridContents = this.random
      ? _.sampleSize(this.contents, this._grid.length)
      : _.take(this.contents, this._grid.length)
  }

  private gridWithLimitedArea() {
    return (
      <div
        key={this.name}
        className="grid h-full w-full flex-1 grid-flow-row-dense auto-rows-[calc(100vw/6)] grid-cols-3 gap-4 p-4 md:grid-cols-4 xl:grid-cols-5"
      >
        {this._grid.map((item, i) => (
          <Link
            key={`masonry-item-${i}`}
            to={this._gridContents[i]?.link || '#'}
            className={twMerge(
              'flex w-full flex-1 items-center justify-center p-3',
              item.className,
              this._gridContents[i]?.className,
            )}
          >
            <img src={this._gridContents[i]?.src} className="h-full w-full object-contain" />
          </Link>
        ))}
      </div>
    )
  }

  private gridWithoutArea() {
    return (
      <div
        key={this.name}
        className="grid h-full w-full flex-1 grid-flow-row-dense auto-rows-[calc(100vw/6)] grid-cols-3 gap-4 p-4 md:grid-cols-4 xl:grid-cols-6"
      >
        {this.contents.map((item, i) => {
          const someSize = this.someSize()
          return (
            <Link
              key={`masonry-item-${i}`}
              to={item?.link || '#'}
              className={twMerge(
                'flex w-full flex-1 items-center justify-center p-3',
                someSize.className,
                item?.className,
              )}
            >
              <img src={item?.src} className="h-full w-full object-contain" />
            </Link>
          )
        })}
      </div>
    )
  }

  public render() {
    if (this.area) return this.gridWithLimitedArea()
    return this.gridWithoutArea()
  }
}
