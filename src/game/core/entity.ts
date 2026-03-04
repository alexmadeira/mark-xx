import type { IEntity, TEntityProps } from '@/interfaces/game/entity/entity'

export abstract class Entity<TProps> implements IEntity {
  protected readonly props: TEntityProps<TProps>

  protected constructor(props: TEntityProps<TProps>) {
    this.props = props
  }

  public get position() {
    return this.props.position
  }
}
