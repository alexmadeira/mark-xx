export interface IPosition {
  readonly x: number
  readonly y: number
  move(dx: number, dy: number): IPosition
  equals(position: IPosition): boolean
  toJSON(): { x: number; y: number }
}
