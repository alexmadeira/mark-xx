import type { IPosition } from '@/interfaces/game/value-object/position'
import type { Scene } from 'phaser'

export type TEntityProps<T> = { position: IPosition } & T

export interface IEntity {
  position: IPosition
  update(...args: unknown[]): void
  destroy(...args: unknown[]): void
  init(...args: unknown[]): void
  render(scene: Scene): void
}
