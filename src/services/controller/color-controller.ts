import type {
  TColor,
  TColorCssVars,
  TColorProps,
  TColors,
  TColorsBetterContrastResult,
} from '@/services/controller/color'
import type { Nullish } from '@/utils/nullish'

import { ZColorProps } from '@/services/controller/color'

import { contrast, isValidColor, opacify } from 'colorizr'
import _ from 'lodash'

import { Css } from '_SRV/utils/css'

export class ColorController {
  private totalColors: number = 0

  private _colors: TColors | null = null

  protected constructor(private readonly _props: TColorProps) {
    this._colors = this.prepareColors()
  }

  static create(props: TColorProps) {
    return new ColorController(ZColorProps.parse(props))
  }

  private parseColor(raw: TColor) {
    if (!isValidColor(raw)) {
      const colorValue = Css.findCorVar(raw)
      if (!isValidColor(colorValue)) throw new Error(`Invalid color: ${raw}`)
      return colorValue
    }

    return raw
  }

  private prepareColors() {
    const variationList = this._props.variations || []

    const dark = this.parseColor(this._props.dark)
    const light = this.parseColor(this._props.light)
    const variations = variationList.map(this.parseColor.bind(this))

    this.totalColors = 2 + variations.length - 1

    return { dark, light, variations }
  }

  private checkContrasts(baseColor: TColor) {
    const contrasts = {} as Record<string, number>

    contrasts[this.colors.dark] = contrast(baseColor, this.colors.dark)
    contrasts[this.colors.light] = contrast(this.colors.light, baseColor)
    this.colors.variations.forEach((color) => {
      contrasts[color] = contrast(baseColor, color)
    })

    return Object.entries(contrasts)
      .sort((a, b) => b[1] - a[1])
      .map(([key]) => key)
  }

  private makeCssVars(color: TColor, name?: string | null) {
    if (!name) return {}
    const cssVars: TColorCssVars = {}

    const foregroundColor = this.betterContrast(color)

    cssVars[`--${name}-color`] = color
    cssVars[`--${name}-shadow-color`] = opacify(foregroundColor.color, 0.3)
    cssVars[`--${name}-foreground-color`] = foregroundColor.color
    cssVars[`--${name}-foreground-shadow-color`] = opacify(color, 0.3)

    return cssVars
  }

  private get colors() {
    if (!this._colors) throw new Error('Colors not initialized')
    return this._colors
  }

  public betterContrast(color?: Nullish<TColor>, name?: string | null, level: number = 0) {
    const rgbColor = this.parseColor(color || this.default)
    const contrasts = this.checkContrasts(rgbColor)
    const contrastIndex = Math.min(level, this.totalColors - 1)

    const result: TColorsBetterContrastResult = {
      color: contrasts[contrastIndex],
      ...this.makeCssVars(contrasts[contrastIndex], name),
    }

    return result
  }

  public randomBetterContrast(color?: TColor, name?: string | null, limit: number = 3) {
    return this.betterContrast(color, name, _.random(limit))
  }

  public set default(color: TColor) {
    this._props.default = color
  }

  public get default() {
    return this.parseColor(this._props.default)
  }
}
