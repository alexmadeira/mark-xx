export interface IPool<T> {
  acquire(): T
  release(item: T): void
  sync(count: number): T[]
  readonly actives: T[]
  readonly head: T
}

export interface IPoolItem<T> {
  create(): T
  onAcquire?(item: T): void
  onRelease?(item: T): void
}
