import type { TSnakeFoodProps } from '@GAMETypes/snake/entity/snake-food'

import { Objective } from '_GAME/core/objective'

import { snakeEvent } from '_SRV/builder/event'

export class SnakeFood extends Objective<TSnakeFoodProps> {
  constructor(props: TSnakeFoodProps) {
    super({
      ...props,
      active: false,
      position: { x: -1, y: -1 },
    })
  }

  private randomPosition() {
    return {
      y: Math.floor(Math.random() * this.props.gridHeight),
      x: Math.floor(Math.random() * this.props.gridWidth),
    }
  }

  public consume() {
    snakeEvent.emit('SNAKE:FOOD:consume')
    super.consume()
  }

  public init() {
    this.setPosition({ x: -1, y: -1 })
    this.props.active = false
  }

  public respawn() {
    if (this.active) return
    this.spawn(this.randomPosition())
  }
}
