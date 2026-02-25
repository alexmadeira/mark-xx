import type { IPosition } from '@GAMETypes/interfaces/value-object/position'

export class Position implements IPosition {
  constructor(
    public readonly x: number,
    public readonly y: number,
  ) {}

  public move(dx: number, dy: number) {
    return new Position(this.x + dx, this.y + dy)
  }

  public equals(other: Position) {
    return this.x === other.x && this.y === other.y
  }
}
