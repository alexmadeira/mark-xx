import type { IGameObject } from './game-object'
import type { IPool } from '@/interfaces/game/infra/pool'

import _ from 'lodash'

export class Pool<T> implements IPool<T> {
  private pool: T[] = []
  private objects: T[] = []

  constructor(private readonly object: IGameObject<T>) {
    _.bindAll(this, ['acquire', 'release', 'sync'])
  }

  public acquire() {
    const object = this.pool.pop() ?? this.object.create().object

    this.object.onAcquire?.(object)
    this.objects.push(object)

    return object
  }

  public release(object: T) {
    const index = this.objects.indexOf(object)
    if (index >= 0) this.objects.splice(index, 1)

    this.object.onRelease?.(object)
    this.pool.push(object)
  }

  public sync(count: number) {
    while (this.objects.length < count) this.acquire()
    while (this.objects.length > count) this.release(this.objects[this.objects.length - 1])

    return this.objects
  }

  public get actives() {
    return this.objects
  }

  public get head() {
    return this.objects[0]
  }
}
