export interface IPosition {
  readonly x: number
  readonly y: number
  equals(position: IPosition): boolean
  move(dx: number, dy: number): IPosition
}
