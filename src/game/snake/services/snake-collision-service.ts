import type { SnakePlayer } from '../entity/snake-player'

import { CollisionService } from '_GAME/core/services/collision-service'

type TSnakeCollisionServiceProps = {
  snake: SnakePlayer
  maxWidth: number
  maxHeight: number
}

export class SnakeCollisionService extends CollisionService<TSnakeCollisionServiceProps> {
  constructor(props: TSnakeCollisionServiceProps) {
    super(props)
  }

  public checkSelfCollision() {
    return this.collidesWithSelf(this.props.snake.head, this.props.snake.tail)
  }

  public checkWallCollision() {
    return this.isOutOfBounds(this.props.snake.head, this.props.maxWidth, this.props.maxHeight)
  }
}
