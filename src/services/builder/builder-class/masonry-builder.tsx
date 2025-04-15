import type { TMasonryCreateProps, TMasonryGridItem, TMasonryProps } from '@/services/builder/masonry'

import _ from 'lodash'
import potpack from 'potpack'

export class MasonryBuilder {
  private _grid: TMasonryGridItem[] = []
  private _noRequiredGrid: TMasonryGridItem[] = []
  private _fillItensGrid: TMasonryGridItem[] = []
  private _maxArea: number = 0

  protected constructor(private readonly _props: TMasonryProps) {}

  static create(props: TMasonryCreateProps) {
    return new MasonryBuilder({
      fill: { ...props.fill, id: `${props.fill.w}x${props.fill.h}` },
      required: { ...props.required, id: `${props.required.w}x${props.required.h}` },
      sizes: props.sizes.map((item) => ({ ...item, id: `${item.w}x${item.h}` })),
    })
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

  private calculateNoRequiredGrid() {
    this._noRequiredGrid = []

    let i = 1
    let area = this.requiredItem.area

    while (area < this._maxArea * 0.7) {
      const item = _.sample(this.sizes)
      if (!item) throw new Error('No available item')

      this._noRequiredGrid.push({ ...item, id: `${item.id}-${i}` })
      area += item.area
      i++
    }
  }

  private calculateFillGrid() {
    const dataArea = _.sumBy([this.requiredItem, ...this._noRequiredGrid], 'area')
    this._fillItensGrid = _.fill(Array(Math.max(this._maxArea - dataArea, 0)), this.fillItem).map((item, i) => ({
      ...item,
      id: `${item.id}-${i}`,
    }))
  }

  private calculateGrid() {
    this._grid = [this.requiredItem, ...this._noRequiredGrid, ...this._fillItensGrid]
    potpack(this._grid)
  }

  public get grid() {
    return this._grid
  }

  public createGrid(area: number) {
    this._maxArea = area

    this.calculateNoRequiredGrid()
    this.calculateFillGrid()
    this.calculateGrid()

    return this._grid
  }
}
