import type { IEntity } from './entity'

export interface IPlayer extends IEntity {
  alive: boolean
  kill(): void
  update(): void
}
