import _ from 'lodash'

export interface ICommandQueue<T> {
  readonly size: number
  clear(): void
  dequeue(): T | undefined
  enqueue(command: T): void
}
