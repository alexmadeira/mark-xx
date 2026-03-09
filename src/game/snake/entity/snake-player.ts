import type {
  TSnakePlayerAction,
  TSnakePlayerBodySegments,
  TSnakePlayerDirection,
  TSnakePlayerProps,
  TSnakePlayerSetActionProps,
  TSnakePlayerSetDirectionProps,
} from '@GAMETypes/snake/entity/snake-player'

import { ZESnakeDirection } from '@/enums/game/snake'

import { oppositeDirection } from '_GAME/config/snake'
import { Palyer } from '_GAME/core/palyer'
import { Position } from '_GAME/core/value-object/position'
import _ from 'lodash'

export class SnakePlayer extends Palyer<TSnakePlayerProps> {
  private bodySegments: TSnakePlayerBodySegments

  constructor(props: TSnakePlayerProps) {
    super({
      ...props,
      position: { x: -1, y: -1 },
    })
    this.bodySegments = [this.position]
  }

  private isSnakeDirection(action: TSnakePlayerAction): action is TSnakePlayerDirection {
    return ZESnakeDirection.safeParse(action).success
  }

  private get startPosition() {
    return new Position(this.props.startPosition.x, this.props.startPosition.y)
  }

  public init() {
    this.isAlive = true
    this.props.direction = 'RIGHT'
    this.setPosition(this.startPosition)

    this.bodySegments = [this.startPosition]
  }

  public move() {
    if (!this.alive) return
    if (!this.position) return

    this.setPosition(this.nextPosition)
    this.bodySegments.unshift(this.position)
    this.bodySegments.pop()
  }

  public setAction(...[action]: TSnakePlayerSetActionProps) {
    if (!action) return
    if (!this.alive) return
    if (this.isSnakeDirection(action)) this.setDirection(action)
  }

  public setDirection(...[direction]: TSnakePlayerSetDirectionProps) {
    if (direction === oppositeDirection[this.direction]) return
    this.props.direction = direction
  }

  public grow() {
    const tail = this.bodySegments[this.bodySegments.length - 1]
    this.bodySegments.push(tail)
  }

  public get tail() {
    return _.tail(this.bodySegments)
  }

  public get body() {
    return this.bodySegments
  }

  public get head() {
    return this.bodySegments[0]
  }

  public get direction() {
    return this.props.direction || 'RIGHT'
  }

  public get nextPosition() {
    const { x, y } = this.position

    switch (this.direction) {
      case 'UP':
        return new Position(x, y - 1)
      case 'DOWN':
        return new Position(x, y + 1)
      case 'LEFT':
        return new Position(x - 1, y)
      case 'RIGHT':
        return new Position(x + 1, y)
    }
  }
}
