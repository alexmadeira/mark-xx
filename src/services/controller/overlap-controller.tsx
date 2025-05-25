import type {
  TOverlapAddElementProps,
  TOverlapElementOption,
  TOverlapProps,
  TOverlapSetTargetProps,
} from '@/services/controller/overlap'

import { ZOverlapProps } from '@/services/controller/overlap'

import { useOverlap } from '_STR/useOverlap'

export class OverlapController {
  private _target: HTMLElement | null = null
  private readonly _props: TOverlapProps

  private readonly actions = useOverlap.getState().actions
  private readonly elementList = new Map<HTMLElement, TOverlapElementOption>()

  constructor(props: TOverlapProps) {
    this._props = ZOverlapProps.parse(props)

    this.setupListener()
  }

  private checkCollision() {
    if (!this.target) return

    let collisionOptions
    const targetRect = this.target.getBoundingClientRect()

    for (const [element, options] of this.elementList.entries()) {
      const elementRect = element.getBoundingClientRect()

      const isOverlapping =
        elementRect.top < targetRect.bottom &&
        elementRect.bottom > targetRect.top &&
        elementRect.left < targetRect.right &&
        elementRect.right > targetRect.left

      if (isOverlapping) collisionOptions = options
    }
    this.actions.setCollision(this.name, collisionOptions)
  }

  private setupListener() {
    this.scrolling.on('scroll', this.checkCollision.bind(this))
  }

  private get scrolling() {
    return this._props.scrolling.ev
  }

  private get name() {
    return this._props.name
  }

  public update() {
    this.checkCollision()
  }

  public setTarget(...[target]: TOverlapSetTargetProps) {
    if (!target) return

    this._target = target
  }

  public addElement(...[element, option]: TOverlapAddElementProps) {
    if (!element) return this

    this.elementList.set(element, option)

    return this as Pick<OverlapController, 'update'>
  }

  public get target() {
    return this._target
  }
}
