import type { IEntity, TEntityProps } from './entity'

export type TPlayerProps<T> = TEntityProps<
  T & {
    tileSize: number
  }
>

export interface IPlayer extends IEntity {
  alive: boolean
  kill(): void
  update(): void
}
