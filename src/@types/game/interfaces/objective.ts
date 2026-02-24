import type { IEntity } from './entity'

export interface IObjective extends IEntity {
  isActive: boolean
  consume(): void
  respawn(): void
}
