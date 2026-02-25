import type { ICommandQueue } from '@GAMETypes/interfaces/core/application/command'

import _ from 'lodash'

export class CommandQueue<T> implements ICommandQueue<T> {
  private queue: T[] = []

  public enqueue(command: T) {
    this.queue.push(command)
  }

  public dequeue() {
    return this.queue.shift()
  }

  public clear() {
    this.queue = []
  }

  get size() {
    return this.queue.length
  }
}
