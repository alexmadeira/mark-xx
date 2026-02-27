import type { IEntity, TEntityProps } from '@/interfaces/game/entity/entity'

export abstract class Entity<TProps> implements IEntity {
  protected readonly props: TEntityProps<TProps>

  protected constructor(props: TEntityProps<TProps>) {
    this.props = props
  }

  abstract init(...args: unknown[]): void
  abstract update(...args: unknown[]): void
  abstract render(...args: unknown[]): void
  abstract destroy(...args: unknown[]): void

  public get position() {
    return this.props.position
  }
}
