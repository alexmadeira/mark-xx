import type { IPoolItem } from './pool-item'

export type TPoolItem<T> = IPoolItem<T>

export interface IPool<T> {
  readonly actives: readonly T[]
  acquire(): T
  sync(count: number): readonly T[]
  release(item: T): void
}
