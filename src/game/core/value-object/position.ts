import type { IPosition, TPosition } from '@GAMETypes/interfaces/value-object/position'

import _ from 'lodash'

export class Position implements IPosition {
  private readonly positionValue: TPosition

  constructor(position: TPosition) {
    this.positionValue = position
  }

  public get value() {
    return this.positionValue
  }

  public get x() {
    return this.positionValue.x
  }

  public get y() {
    return this.positionValue.y
  }

  public equals(position: Position | TPosition) {
    return position.x === this.x && position.y === this.y
  }
}
