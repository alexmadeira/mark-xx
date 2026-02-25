import type { TKeyActionSetEventActionProps } from '@GAMETypes/core/keyboard-action'
import type { ICommandQueue } from '@GAMETypes/interfaces/value-object/command-queue'

import _ from 'lodash'

import { CommandQueue } from './value-object/command-queue'

type TKeyMap<T> = Record<string, T>

export abstract class KeyboardAction<T> {
  protected readonly queue: ICommandQueue<T>

  constructor(protected readonly keyMap: TKeyMap<T>) {
    this.queue = new CommandQueue<T>()

    _.bindAll(this, ['setEventAction', 'consume'])
  }

  abstract init(...args: unknown[]): void
  abstract update(): void
  abstract destroy(): void

  protected setEventAction(...[event]: TKeyActionSetEventActionProps) {
    const action = this.keyMap[event.key]
    if (!action) return

    this.queue.enqueue(action)
  }

  public consume() {
    return this.queue.dequeue()
  }
}
