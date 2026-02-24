import type { IEntity } from '@/game/interfaces/entity'
import type { TEntityProps } from '@GAMETypes/core/entity'

import { UniqueEntityID } from './unique-entity-id'

export abstract class Entity<TProps> implements IEntity {
  private readonly _id: UniqueEntityID
  protected readonly props: TProps & TEntityProps

  protected constructor(props: TProps & TEntityProps, id?: UniqueEntityID) {
    this._id = id ?? new UniqueEntityID()
    this.props = props
  }

  abstract init(...args: unknown[]): void
  abstract update(...args: unknown[]): void
  abstract render(...args: unknown[]): void
  abstract destroy(...args: unknown[]): void

  public equals(entity: Entity<unknown>) {
    if (entity === this) return true
    if (entity.id === this._id) return true

    return false
  }

  public get id() {
    return this._id
  }

  public get position() {
    return this.props.position
  }
}
