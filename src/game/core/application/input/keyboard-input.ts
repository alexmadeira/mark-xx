import type {
  TKeyboardInputMap,
  TKeyboardInputProps,
  TKeyboardInputSetEventActionProps,
} from '@GAMETypes/core/application/input/keyboard-input'

import _ from 'lodash'

import { CommandQueue } from '../command/command-queue'

export abstract class KeyboardInput<T> {
  constructor(
    protected readonly keyMap: TKeyboardInputMap<T>,
    private readonly props: TKeyboardInputProps<T> = {},
  ) {
    this.props.queue = props.queue ?? new CommandQueue<T>()
    this.props.queueLimit = props.queueLimit ?? 4

    _.bindAll(this, ['setEventAction', 'consume'])
  }

  abstract init(...args: unknown[]): void
  abstract update(): void
  abstract destroy(): void

  private get queue() {
    return this.props.queue!
  }

  private get queueLimit() {
    return this.props.queueLimit!
  }

  protected setEventAction(...[event]: TKeyboardInputSetEventActionProps) {
    const action = this.keyMap[event.key]
    if (!action) return
    if (this.queueLimit <= 0) this.queue.enqueue(action)
    if (this.queue.size < this.queueLimit) this.queue.enqueue(action)
  }

  public consume() {
    return this.queue.dequeue()
  }
}
