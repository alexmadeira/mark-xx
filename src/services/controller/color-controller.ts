import type { TColor, TColorCssVars, TColorMotionColors, TColorProps, TColors } from '@/services/controller/color'
import type { Nullish } from '@/utils/nullish'

import { ZColorProps } from '@/services/controller/color'

import { contrast, convert, isValidColor, opacify } from 'colorizr'
import _ from 'lodash'
import { animate, motionValue } from 'motion'

import { Css } from '_SRV/utils/css'

export class ColorController<TColorName = string> {
  private totalColors: number = 0
  private colors: TColors

  private readonly motionColors: TColorMotionColors

  protected constructor(private readonly _props: TColorProps) {
    this.colors = this.prepareColors()
    this.motionColors = new Map()
  }

  static create<C>(props: TColorProps) {
    return new ColorController<C>(ZColorProps.parse(props))
  }

  private parseColor(raw: TColor) {
    if (!isValidColor(raw)) {
      const colorValue = Css.findCorVar(raw)
      if (!isValidColor(colorValue)) throw new Error(`Invalid color: ${raw}`)
      return convert(colorValue, 'rgb')
    }

    return convert(raw, 'rgb')
  }

  private prepareColors() {
    const variationList = this.variations || []

    const dark = this.parseColor(this.dark)
    const light = this.parseColor(this.light)
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

  private setCssVars(cssVars: TColorCssVars) {
    _.forEach(cssVars, (color, key) => {
      if (!this.transition) return document.documentElement.style.setProperty(key, color)
      if (!this.motionColors.has(key)) this.motionColors.set(key, motionValue(color))

      animate(this.motionColors.get(key)!, color, {
        ...this.transition,
        onUpdate: (value) => {
          document.documentElement.style.setProperty(key, value)
        },
      })
    })
  }

  private makeCssVars(rgbColor: TColor, name: TColorName, level: number) {
    const cssVars: TColorCssVars = {}

    const contrastColor = this.contrastingColor(rgbColor, level)
    const foregroundColor = this.contrastingColor(contrastColor, level)

    cssVars[`--${name}-color`] = rgbColor
    cssVars[`--${name}-shadow-color`] = opacify(contrastColor, 0.3)
    cssVars[`--${name}-foreground-color`] = contrastColor
    cssVars[`--${name}-foreground-shadow-color`] = opacify(rgbColor, 0.3)

    cssVars[`--${name}-contrast-color`] = contrastColor
    cssVars[`--${name}-contrast-shadow-color`] = opacify(foregroundColor, 0.3)
    cssVars[`--${name}-contrast-foreground-color`] = foregroundColor
    cssVars[`--${name}-contrast-foreground-shadow-color`] = opacify(contrastColor, 0.3)

    return cssVars
  }

  private contrastingColor(rgbColor: TColor, level: number = 0) {
    const contrasts = this.checkContrasts(rgbColor)
    const contrastIndex = Math.min(level, this.totalColors - 1)

    return contrasts[contrastIndex]
  }

  public betterContrast(name: TColorName, color: Nullish<TColor>, level: number = 0) {
    const rgbColor = this.parseColor(color || this.default)
    const cssVars = this.makeCssVars(rgbColor, name, level)

    this.setCssVars(cssVars)
  }

  public randomBetterContrast(name: TColorName, color: Nullish<TColor>, limit: number = 3) {
    return this.betterContrast(name, color, _.random(limit))
  }

  public set default(color: TColor) {
    this._props.default = color
  }

  public get default() {
    return this.parseColor(this._props.default)
  }

  public get dark() {
    return this._props.dark
  }

  public get light() {
    return this._props.light
  }

  public get variations() {
    return this._props.variations
  }

  public get transition() {
    return this._props.transition
  }
}
