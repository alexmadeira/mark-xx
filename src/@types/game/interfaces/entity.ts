import type { IPosition } from './value-object/position'
import type { Scene } from 'phaser'

export interface IEntity {
  position: IPosition
  update(...args: unknown[]): void
  destroy(...args: unknown[]): void
  init(...args: unknown[]): void
  render(scene: Scene): void
}
