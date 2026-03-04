import type { TPlayerProps } from '@/interfaces/game/entity/player'
import type {
  TSnakePlayerAction,
  TSnakePlayerBodySegments,
  TSnakePlayerDirection,
  TSnakePlayerProps,
  TSnakePlayerSetActionProps,
  TSnakePlayerSetDirectionProps,
  TSnakePlayerSetPositionProps,
} from '@GAMETypes/snake/entity/snake-player'

import { ZESnakeDirection } from '@/enums/game/snake'

import { oppositeDirection } from '_GAME/config/snake'
// import { Pool } from '_GAME/core/infra/pool'
import { Palyer } from '_GAME/core/palyer'
import { Position } from '_GAME/core/value-object/position'
// import { SnakeSegment } from '_GAME/snake/infra/pool/snake-segment'
import _ from 'lodash'

export class SnakePlayer extends Palyer<TSnakePlayerProps> {
  private readonly bodySegments: TSnakePlayerBodySegments

  constructor(props: TPlayerProps<TSnakePlayerProps>) {
    super(props)
    this.bodySegments = [props.position]
  }

  private isSnakeDirection(action: TSnakePlayerAction): action is TSnakePlayerDirection {
    return ZESnakeDirection.safeParse(action).success
  }

  public get direction() {
    return this.props.direction || 'RIGHT'
  }

  public move() {
    if (!this.position) return
    this.props.position = this.nextPosition

    this.bodySegments.unshift(this.position)
    this.bodySegments.pop()
  }

  public setPosition(...[x, y]: TSnakePlayerSetPositionProps) {
    this.props.position = new Position(x, y)
  }

  public setAction(...[action]: TSnakePlayerSetActionProps) {
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
