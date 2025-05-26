import type {
  TColor,
  TColorCssVars,
  TColorProps,
  TColors,
  TColorsBetterContrastResult,
} from '@/services/controller/color'

import { ZColorProps } from '@/services/controller/color'

import _ from 'lodash'
import { getContrast, parseToRgb, rgbToColorString } from 'polished'

export class ColorController {
  private totalColors: number = 0

  private _colors: TColors | null = null

  protected constructor(private readonly _props: TColorProps) {
    this._colors = this.prepareColors()
  }

  static create(props: TColorProps) {
    return new ColorController(ZColorProps.parse(props))
  }

  private parseColor(color: TColor) {
    return rgbToColorString(parseToRgb(color))
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

    contrasts[this.colors.dark] = getContrast(baseColor, this.colors.dark)
    contrasts[this.colors.light] = getContrast(this.colors.light, baseColor)
    this.colors.variations.forEach((color) => {
      contrasts[color] = getContrast(baseColor, color)
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
    cssVars[`--${name}-shadow-color`] = foregroundColor.color
    cssVars[`--${name}-foreground-color`] = foregroundColor.color
    cssVars[`--${name}-foreground-shadow-color`] = color

    return cssVars
  }

  private get colors() {
    if (!this._colors) throw new Error('Colors not initialized')
    return this._colors
  }

  private get defaultColorKey() {
    return this._props.default
  }

  public betterContrast(color?: TColor, name?: string | null, level: number = 0) {
    const result: TColorsBetterContrastResult = {
      color: this.default,
      cssVars: this.makeCssVars(this.default, name),
    }

    if (!color) return result

    const rgbColor = this.parseColor(color)
    const contrasts = this.checkContrasts(rgbColor)
    const contrastIndex = Math.min(level, this.totalColors - 1)

    result.color = contrasts[contrastIndex]
    result.cssVars = this.makeCssVars(result.color, name)

    return result
  }

  public randomBetterContrast(color?: TColor, name?: string | null, limit: number = 3) {
    return this.betterContrast(color, name, _.random(limit))
  }

  public get default() {
    return this.colors[this.defaultColorKey]
  }
}
