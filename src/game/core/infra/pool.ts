import type { IPool, IPoolItem } from '@GAMETypes/interfaces/infra/pool'

import _ from 'lodash'

export class Pool<T> implements IPool<T> {
  private pool: T[] = []
  private items: T[] = []

  constructor(private readonly item: IPoolItem<T>) {
    _.bindAll(this, ['acquire', 'release', 'sync'])
  }

  public acquire() {
    const item = this.pool.pop() ?? this.item.create()

    this.item.onAcquire?.(item)
    this.items.push(item)

    return item
  }

  public release(item: T) {
    const index = this.items.indexOf(item)
    if (index >= 0) this.items.splice(index, 1)

    this.item.onRelease?.(item)
    this.pool.push(item)
  }

  public sync(count: number) {
    while (this.items.length < count) this.acquire()
    while (this.items.length > count) this.release(this.items[this.items.length - 1])

    return this.items
  }

  get actives() {
    return this.items
  }
}
