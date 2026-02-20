import type { TMouseSetElementProps } from '@/services/controller/mouse'

import _ from 'lodash'

import { useMouse } from '_STR/useMouse'

export class MouseController {
  private readonly elementMap = new Map<string, HTMLElement>()

  private readonly mouseActions = useMouse.getState().actions

  constructor() {
    _.bindAll(this, ['mouseMove'])
  }

  private mouseMove(event: MouseEvent) {
    this.mouseActions.setDocumentPosition({ x: event.clientX, y: event.clientY })

    for (const [name, element] of this.elementMap.entries()) {
      const elementRect = element.getBoundingClientRect()
      const elementX = event.pageX - (elementRect.left + window.pageXOffset)
      const elementY = event.pageY - (elementRect.top + window.pageYOffset)

      this.mouseActions.setElementPosition(name, { x: elementX, y: elementY })
    }
  }

  public init() {
    if (!window || !window.document) return
    window.document.addEventListener('mousemove', this.mouseMove)
  }

  public setElement(...[name, element]: TMouseSetElementProps) {
    if (!element) return

    this.elementMap.set(name, element)
  }
}
