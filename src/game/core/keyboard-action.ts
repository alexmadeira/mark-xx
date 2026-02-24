import type { Nullish } from '@/utils/nullish'
import type {
  TKeyActionOf,
  TKeyActionSetActionProps,
  TKeyActionSetEventActionProps,
  TKeyMap,
} from '@GAMETypes/core/keyboard-action'
import type { IInputAction } from '@GAMETypes/interfaces/input-action'

import _ from 'lodash'

export abstract class KeyboardAction<TKeyboardMap extends TKeyMap> implements IInputAction<TKeyActionOf<TKeyboardMap>> {
  private currentAction: Nullish<TKeyActionOf<TKeyboardMap>>

  constructor(protected readonly keyMap: TKeyboardMap) {
    _.bindAll(this, ['setEventAction', 'setAction'])
  }

  abstract init(...args: unknown[]): void
  abstract update(): void
  abstract destroy(): void

  protected setEventAction(...[event]: TKeyActionSetEventActionProps) {
    const action = this.keyMap[event.key as keyof TKeyboardMap]
    if (!action) return

    this.setAction(action)
  }

  protected setAction(...[action]: TKeyActionSetActionProps<TKeyboardMap>) {
    this.currentAction = action
  }

  public get action() {
    const action = this.currentAction
    this.currentAction = null
    return action
  }
}
