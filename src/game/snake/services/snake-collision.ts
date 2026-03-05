import type { SnakePlayer } from '../entity/snake-player'

import { CollisionService } from '_GAME/core/services/collision-service'

type TSnakeCollisionProps = {
  snake: SnakePlayer
  maxWidth: number
  maxHeight: number
}

export class SnakeCollision extends CollisionService<TSnakeCollisionProps> {
  constructor(props: TSnakeCollisionProps) {
    super(props)
  }

  private get snake() {
    return this.props.snake
  }

  public checkSelfCollision() {
    if (this.snake.body.length < 4) return false
    return (
      this.collidesWithSelf(this.snake.nextPosition, this.snake.tail) ||
      this.collidesWithSelf(this.snake.head, this.snake.tail)
    )
  }

  public checkWallCollision() {
    return this.isOutOfBounds(this.props.snake.nextPosition, this.props.maxWidth, this.props.maxHeight)
  }

  public get contrarySide() {
    const result = this.snake.nextPosition.toJSON()

    if (this.snake.nextPosition.x < 0) result.x = this.props.maxWidth
    if (this.snake.nextPosition.y < 0) result.y = this.props.maxHeight
    if (this.snake.nextPosition.x >= this.props.maxWidth) result.x = -1
    if (this.snake.nextPosition.y >= this.props.maxHeight) result.y = -1

    return [result.x, result.y] as const
  }
}
