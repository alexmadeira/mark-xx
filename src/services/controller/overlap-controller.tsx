import type {
  TOverlapAddElementProps,
  TOverlapElementOption,
  TOverlapProps,
  TOverlapSetTargetProps,
} from '@/services/controller/overlap'

import { ZOverlapProps } from '@/services/controller/overlap'

import { useOverlap } from '_STR/useOverlap'

export class OverlapController {
  private readonly _props: TOverlapProps

  private readonly actions = useOverlap.getState().actions
  private readonly elementList = new Map<HTMLElement, TOverlapElementOption>()
  private readonly targetMap = new Map<string, HTMLElement>()

  protected constructor(props: TOverlapProps) {
    this._props = ZOverlapProps.parse(props)

    this._props.scrolling.ev.on('scroll', this.checkCollision.bind(this))
  }

  public static create(props: TOverlapProps) {
    return new OverlapController(props)
  }

  private checkCollision() {
    for (const [name, target] of this.targetMap.entries()) {
      let collisionOptions

      for (const [element, options] of this.elementList.entries()) {
        const elementRect = element.getBoundingClientRect()

        const targetRect = target.getBoundingClientRect()
        const isOverlapping =
          elementRect.top < targetRect.bottom &&
          elementRect.bottom > targetRect.top &&
          elementRect.left < targetRect.right &&
          elementRect.right > targetRect.left

        if (isOverlapping) collisionOptions = options
      }

      this.actions.setCollision(name, collisionOptions)
    }
  }

  public update() {
    this.checkCollision()
  }

  public reset() {
    for (const name of this.targetMap.keys()) {
      this.actions.setCollision(name, null)
    }
  }

  public setTarget(...[name, target]: TOverlapSetTargetProps) {
    if (!target) return

    this.targetMap.set(name, target)
  }

  public removeTarget(name: string) {
    this.targetMap.delete(name)
  }

  public addElement(...[element, option]: TOverlapAddElementProps) {
    if (!element) return this
    this.elementList.set(element, option)
    return this as Pick<OverlapController, 'update'>
  }

  public removeElement(element: HTMLElement) {
    this.elementList.delete(element)
  }

  public get targets() {
    return this.targetMap
  }
}
