import type {
  TElement,
  TElementClassName,
  TElementCssVars,
  TElementMeasure,
  TElementProps,
} from '@/services/controller/element'
import type { Nullish } from '@/utils/nullish'

import { ZElementClassName, ZElementMeasure, ZElementOptions } from '@/services/controller/element'

import _ from 'lodash'

import { useElement } from '_STR/useElement'

export class ElementController {
  private readonly elementCssVars: TElementCssVars = {}

  private readonly elementActions = useElement.getState().actions

  protected constructor(private readonly _props: TElement) {
    this.setup()
  }

  static create(props: TElementProps) {
    const settings = ZElementOptions.parse(_.get(props, 'options', {}))
    const measure = ZElementMeasure.parse(_.get(props, 'measure', {}))
    const className = ZElementClassName.parse(_.get(props, 'className', ''))

    return new ElementController({
      ...props,
      measure,
      className,
      settings: {
        cssVars: {
          name: _.get(settings, 'cssVars.name', props.name),
          global: _.get(settings, 'cssVars.global', true),
        },
      },
    })
  }

  private setup() {
    this.addElement()
  }

  private addElement() {
    this.elementActions.addElement(this.name)
  }

  private buildCssVars() {
    const element = useElement.getState().data[this.name]

    Object.entries(element.measure).forEach(([key, value]) => {
      this.elementCssVars[`--${this.name}-measure-${key}`] = `${value}px`
    })
  }

  public setMeasure(measure: Partial<TElementMeasure>) {
    if (_.every(measure, (value) => !value)) return

    this.elementActions.setMeasure(this.name, measure)
    this.updateCssVars()
  }

  public updateCssVars() {
    this.buildCssVars()
    if (this.settings.cssVars.global) {
      _.forEach(this.elementCssVars, (value, key) => {
        document.documentElement.style.setProperty(key, value)
      })
    }
  }

  public setClassName(className: Nullish<TElementClassName>) {
    this.elementActions.setClassName(this.name, className || '')
  }

  public get name() {
    return this._props.name
  }

  public get measure() {
    return this._props.measure
  }

  public get settings() {
    return this._props.settings
  }

  public get cssVars() {
    return this.elementCssVars
  }
}
