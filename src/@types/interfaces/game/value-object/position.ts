export type TPosition = { x: number; y: number }
export interface IPosition {
  readonly x: number
  readonly y: number
  move(dx: number, dy: number): IPosition
  equals(position: IPosition): boolean
  toJSON(): TPosition
}
