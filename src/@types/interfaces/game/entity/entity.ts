import type { IPosition, TPosition } from '@/interfaces/game/value-object/position'

export type TEntityProps<T> = { position: TPosition } & T

export interface IEntity {
  readonly position: IPosition
  setPosition: (position: TPosition) => void
}
