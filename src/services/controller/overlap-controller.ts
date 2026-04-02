import type {
  TOverlapAddElementProps,
  TOverlapElementOption,
  TOverlapHTMLElement,
  TOverlapSetTargetProps,
} from '@/services/controller/overlap'

import _ from 'lodash'

import { useOverlap } from '_STR/useOverlap'

export class OverlapController {
  private readonly actions = useOverlap.getState().actions

  private readonly targetMap = new Map<string, HTMLElement>()
  private readonly elementList = new Map<HTMLElement, TOverlapElementOption>()

  constructor() {
    _.bindAll(this, [
      'reset',
      'setTarget',
      'addElement',
      'removeTarget',
      'removeElement',
      'checkCollision',
      'collisionMonitor',
    ])

    requestAnimationFrame(this.collisionMonitor)
  }

  private collisionMonitor() {
    this.checkCollision()
    requestAnimationFrame(this.collisionMonitor)
  }

  public checkCollision() {
    for (const [name, target] of this.targetMap.entries()) {
      let collisionOptions = null

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
    if (!element) return
    this.elementList.set(element, option)
  }

  public removeElement(element: TOverlapHTMLElement) {
    if (!element) return
    this.elementList.delete(element)
  }

  public get targets() {
    return this.targetMap
  }

  public get elements() {
    return this.elementList
  }
}
