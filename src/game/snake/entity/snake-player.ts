import type { IPool } from '@GAMETypes/interfaces/value-object/pool'
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

import { Palyer } from '_GAME/core/palyer'
import { Pool } from '_GAME/core/value-object/pool'
import { Position } from '_GAME/core/value-object/position'
import { SnakeSegment } from '_GAME/snake/pool/snake-segment'
import { ZESnakeDirection } from '@GAMETypes/enums/snake'
import _ from 'lodash'

export class SnakePlayer extends Palyer<TSnakePlayerProps> {
  private readonly bodySegments: TSnakePlayerBodySegments
  private segmentPool!: IPool<TSnakePlayerSegment>

  private readonly opposite = {
    UP: 'DOWN',
    DOWN: 'UP',
    LEFT: 'RIGHT',
    RIGHT: 'LEFT',
  } as const

  constructor(props: TSnakePlayerProps) {
    super(props)
    this.bodySegments = [props.position]
  }

  private isSnakeDirection(action: TSnakePlayerAction): action is TSnakePlayerDirection {
    return ZESnakeDirection.safeParse(action).success
  }

  private computeNextPosition() {
    const { x, y } = this.position

    switch (this.props.direction) {
      case 'UP':
        return new Position({ x, y: y - 1 })
      case 'DOWN':
        return new Position({ x, y: y + 1 })
      case 'LEFT':
        return new Position({ x: x - 1, y })
      case 'RIGHT':
        return new Position({ x: x + 1, y })
    }
  }

  public move() {
    if (!this.position) return
    this.props.position = this.computeNextPosition()
  }

  public setPosition(...[position]: TSnakePlayerSetPositionProps) {
    this.props.position = new Position(position)
  }

  public setAction(...[action]: TSnakePlayerSetActionProps) {
    if (this.isSnakeDirection(action)) this.setDirection(action)
  }

  public setDirection(...[direction]: TSnakePlayerSetDirectionProps) {
    if (direction === this.opposite[this.props.direction]) return
    this.props.direction = direction
  }

  public grow() {
    const tail = this.bodySegments[this.bodySegments.length - 1]
    this.bodySegments.push({ ...tail })
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

  public get body() {
    return this.bodySegments
  }

  public get tail() {
    return _.tail(this.bodySegments)
  }
}
