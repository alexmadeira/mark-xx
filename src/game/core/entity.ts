import type { IEntity, TEntityProps } from '@/interfaces/game/entity/entity'
import type { IPosition, TPosition } from '@/interfaces/game/value-object/position'

import { Position } from './value-object/position'

export abstract class Entity<TProps> implements IEntity {
  private entityPosition: IPosition

  protected constructor(protected readonly props: TEntityProps<TProps>) {
    this.entityPosition = new Position(props.position.x, props.position.y)
  }

  public setPosition(position: TPosition | Position) {
    this.entityPosition = position instanceof Position ? position : new Position(position.x, position.y)
  }

  public get position() {
    return this.entityPosition
  }
}
