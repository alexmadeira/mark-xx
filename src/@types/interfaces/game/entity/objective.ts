import type { IEntity, TEntityProps } from './entity'
import type { IPosition } from '@/interfaces/game/value-object/position'

export type TObjectiveSpawnProps = [IPosition]

export type TObjectiveProps<T> = TEntityProps<
  T & {
    active: boolean
  }
>

export interface IObjective extends IEntity {
  isActive: boolean
  consume(): void
  respawn(): void
}
