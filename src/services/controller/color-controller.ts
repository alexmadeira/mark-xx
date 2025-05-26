import type { TColor, TColorProps, TColors } from '@/services/controller/color'

import { ZColorProps } from '@/services/controller/color'

import _ from 'lodash'
import { getContrast, parseToRgb, rgbToColorString } from 'polished'

export class ColorController {
  private _colors: TColors | null = null

  protected constructor(private readonly _props: TColorProps) {
    this._colors = this.prepareColors()
  }

  static create(props: TColorProps) {
    return new ColorController(ZColorProps.parse(props))
  }

  private parseColor(props: TColor) {
    return rgbToColorString(parseToRgb(props))
  }

  private prepareColors() {
    const variationList = this._props.variations || []

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
