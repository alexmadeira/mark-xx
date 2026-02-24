export type TPosition = { x: number; y: number }

export interface IPosition {
  value: TPosition
  x: TPosition['x']
  y: TPosition['y']
  equals(position: IPosition | TPosition): boolean
}
