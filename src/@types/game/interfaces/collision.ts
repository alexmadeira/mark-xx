import type { IPosition } from './value-object/position'

export interface ICollision {
  addObstacle(position: IPosition): void
  removeObstacle(position: IPosition): void
  updateObstacle(position: IPosition[]): void
  whithGridEnds(position: IPosition): boolean
  whithObstacle(position: IPosition): boolean
}
