import type { TSnakeFoodProps } from '@GAMETypes/snake/entity/snake-food'

import { Objective } from '_GAME/core/objective'
import { Position } from '_GAME/core/value-object/position'

export class SnakeFood extends Objective<TSnakeFoodProps> {
  constructor(props: TSnakeFoodProps) {
    super({
      ...props,
      active: false,
      position: new Position(-1, -1),
    })
  }

  private randomPosition() {
    return {
      y: Math.floor(Math.random() * this.props.gridHeight),
      x: Math.floor(Math.random() * this.props.gridWidth),
    }
  }

  public respawn() {
    if (this.active) return

    const { x, y } = this.randomPosition()
    const position = new Position(x, y)
    this.spawn(position)
  }
}
