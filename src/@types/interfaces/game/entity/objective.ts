import type { IEntity, TEntityProps } from './entity'
import type { TPosition } from '@/interfaces/game/value-object/position'

export type TObjectiveSpawnProps = [TPosition]

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
