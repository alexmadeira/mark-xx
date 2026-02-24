import type { ICollision } from '@/game/interfaces/collision'
import type {
  TCollisionAddObstacleProps,
  TCollisionProps,
  TCollisionRemoveObstacleProps,
  TCollisionUpdateObstacleProps,
  TCollisionWhithGridEndsProps,
  TCollisionWhithObstacleEndsProps,
} from '@GAMETypes/core/collision'

import { ObstacleList } from '_GAME/snake/list/obstacle-list'
import _ from 'lodash'

export abstract class Collision<TProps = unknown> implements ICollision {
  private obstacles: ObstacleList

  protected constructor(protected readonly props: TProps & TCollisionProps) {
    this.obstacles = new ObstacleList()
  }

  public addObstacle(...[position]: TCollisionAddObstacleProps) {
    this.obstacles.add(position)
  }

  public removeObstacle(...[position]: TCollisionRemoveObstacleProps) {
    this.obstacles.remove(position)
  }

  public updateObstacle(...[positions]: TCollisionUpdateObstacleProps) {
    this.obstacles.update(positions)
  }

  public whithGridEnds(...[position]: TCollisionWhithGridEndsProps) {
    return !_.inRange(position.x, 0, this.props.gridWidth) || !_.inRange(position.y, 0, this.props.gridHeight)
  }

  public whithObstacle(...[position]: TCollisionWhithObstacleEndsProps) {
    return this.obstacles.exists(position)
  }
}
