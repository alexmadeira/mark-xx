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
    this.init()
    this.render = this.render.bind(this)
  }

  static create(props: TMasonryProps) {
    return new MasonryBuilder(props)
  }

  private init() {
    this.calculateNoRequiredGrid()
    this.calculateFillGrid()
    this.calculateGrid()
    this.calculateContents()
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

  private get contents() {
    return this._props.contents
  }

  private calculateNoRequiredGrid() {
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
    const dataArea = _.sumBy([this.requiredItem, ...this._noRequiredGrid], 'area')
    this._fillItensGrid = _.fill(Array(Math.max(this.area - dataArea, 0)), this.fillItem)
  }

  private calculateGrid() {
    this._grid = [this.requiredItem, ...this._noRequiredGrid, ...this._fillItensGrid]
    potpack(this._grid)
  }

  private calculateContents() {
    this._gridContents = _.sampleSize(this.contents, this._grid.length)
  }

  public render() {
    return this._grid.map((item, i) => {
      return (
        <Link
          key={`masonry-item-${i}`}
          to={this._gridContents[i].link || '#'}
          className={twMerge(
            'flex w-full flex-1 items-center justify-center p-3',
            item.className,
            this._gridContents[i].className,
          )}
        >
          <img src={this._gridContents[i].src} className="h-full w-full object-contain" />
        </Link>
      )
    })
  }
}
