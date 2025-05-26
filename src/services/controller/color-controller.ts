import type { TColor, TColorData, TColorProps, TColors } from '@/services/controller/color'

import { ZColorData, ZColorHex, ZColorProps, ZColorRGB } from '@/services/controller/color'

import _ from 'lodash'
import { getContrast, rgba } from 'polished'

export class ColorController {
  private _colors: TColors | null = null

  protected constructor(private readonly _props: TColorProps) {
    this._colors = this.prepareColors()
  }

  static create(props: TColorProps) {
    return new ColorController(ZColorProps.parse(props))
  }

  private parseColor(props: TColorData | TColor) {
    const colorData = ZColorData.parse(_.concat(props, 1).slice(0, 2))

    return this.hexColor(colorData) || this.rgbColor(colorData)
  }

  private hexColor([color, alpha]: TColorData) {
    const { data } = ZColorHex.safeParse(color)

    if (!data) return ''
    return rgba(data, alpha)
  }

  private rgbColor([color, alpha]: TColorData) {
    const { data } = ZColorRGB.safeParse(color)

    if (!data) return ''
    const rgbColor = data.split(',').map((c) => parseInt(c.trim(), 10))

    return rgba(rgbColor[0], rgbColor[1], rgbColor[2], alpha)
  }

  private prepareColors() {
    const variationList = this._props.variations

    const dark = this.parseColor(this._props.dark)
    const light = this.parseColor(this._props.light)
    const variations = variationList.map(this.parseColor.bind(this))

    return { dark, light, variations }
  }

  private checkContrasts(color: TColor) {
    const baseColor = this.parseColor(color)

    const contrasts = {} as Record<string, number>

    contrasts[this.colors.dark] = getContrast(baseColor, this.colors.dark)
    contrasts[this.colors.light] = getContrast(this.colors.light, baseColor)
    this.colors.variations.forEach((color) => {
      contrasts[color] = getContrast(baseColor, color)
    })

    return Object.entries(contrasts)
      .sort((a, b) => b[1] - a[1])
      .map(([key]) => key)
  }

  private get colors() {
    if (!this._colors) throw new Error('Colors not initialized')
    return this._colors
  }

  private get defaultColorKey() {
    return this._props.default
  }

  public betterContrast(color?: TColor) {
    if (!color) return this.default

    const [better] = this.checkContrasts(color)
    return better
  }

  public randomBetterContrast(color?: TColor, limit: number = 3) {
    if (!color) return this.default
    const contrasts = this.checkContrasts(color)

    return _.sample(_.slice(contrasts, 0, limit)) || this.default
  }

  public get default() {
    return this.colors[this.defaultColorKey]
  }
}
