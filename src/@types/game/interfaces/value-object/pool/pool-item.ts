export interface IPoolItem<T> {
  create(): T
  onAcquire?(item: T): void
  onRelease?(item: T): void
}
