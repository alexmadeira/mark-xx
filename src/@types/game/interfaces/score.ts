import type { Scene } from 'phaser'

export interface IScore {
  readonly total: number
  addPoint(): void
  reset(): void
  update(): void
  destroy(): void
  init(...args: unknown[]): void
  render(scene: Scene): void
}
