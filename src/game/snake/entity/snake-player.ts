import type { IPool } from '@GAMETypes/interfaces/infra/pool'
import type {
  TSnakePlayerAction,
  TSnakePlayerBodySegments,
  TSnakePlayerDirection,
  TSnakePlayerInitProps,
  TSnakePlayerProps,
  TSnakePlayerSegment,
  TSnakePlayerSetActionProps,
  TSnakePlayerSetDirectionProps,
  TSnakePlayerSetPositionProps,
} from '@GAMETypes/snake/entity/snake-player'

import { oppositeDirection } from '_GAME/config/snake'
import { Pool } from '_GAME/core/infra/pool'
import { Palyer } from '_GAME/core/palyer'
import { Position } from '_GAME/core/value-object/position'
import { SnakeSegment } from '_GAME/snake/infra/pool/snake-segment'
import { ZESnakeDirection } from '@GAMETypes/enums/snake'
import _ from 'lodash'

export class SnakePlayer extends Palyer<TSnakePlayerProps> {
  private readonly bodySegments: TSnakePlayerBodySegments
  private segmentPool!: IPool<TSnakePlayerSegment>

  constructor(props: TSnakePlayerProps) {
    super(props)
    this.bodySegments = [props.position]
  }

  private isSnakeDirection(action: TSnakePlayerAction): action is TSnakePlayerDirection {
    return ZESnakeDirection.safeParse(action).success
  }

  private get direction() {
    return this.props.direction || 'RIGHT'
  }

  private get nextPosition() {
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

  public move() {
    if (!this.position) return
    this.props.position = this.nextPosition
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

  public init(...[scene]: TSnakePlayerInitProps) {
    this.segmentPool = new Pool(new SnakeSegment(scene, this.props.tileSize))
  }

  public update() {
    this.bodySegments.unshift(this.position)
    this.bodySegments.pop()
  }

  public render() {
    if (!this.segmentPool) return
    this.segmentPool.sync(this.bodySegments.length)

    this.bodySegments.forEach((segment, index) => {
      this.segmentPool.actives[index].setPosition(segment.x * this.props.tileSize, segment.y * this.props.tileSize)
    })
  }

  public destroy() {
    if (!this.segmentPool) return
    this.segmentPool.actives.forEach((segment) => segment.destroy())
  }

  public get tail() {
    return _.tail(this.bodySegments)
  }

  public get head() {
    return this.bodySegments[0]
  }

  public get body() {
    return this.bodySegments
  }
}
