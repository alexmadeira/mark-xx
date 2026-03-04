import type { IPosition } from '@/interfaces/game/value-object/position'

export type TEntityProps<T> = { position: IPosition } & T

export interface IEntity {
  position: IPosition
}
