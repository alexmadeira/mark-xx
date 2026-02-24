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
  private bodySegment: TSnakePlayerBodySegments
  private segmentPool!: IPool<TSnakePlayerSegment>

  constructor(props: TSnakePlayerProps) {
    super(props)
    this.bodySegment = [props.position]
  }

  private isSnakeDirection(action: TSnakePlayerAction): action is TSnakePlayerDirection {
    return ZESnakeDirection.safeParse(action).success
  }

  public move() {
    if (!this.position) return
    switch (this.props.direction) {
      case 'UP':
        this.props.position = new Position({ x: this.position.x, y: this.position.y - 1 })
        break
      case 'DOWN':
        this.props.position = new Position({ x: this.position.x, y: this.position.y + 1 })
        break
      case 'LEFT':
        this.props.position = new Position({ x: this.position.x - 1, y: this.position.y })
        break
      case 'RIGHT':
        this.props.position = new Position({ x: this.position.x + 1, y: this.position.y })
        break
    }
  }

  public setPosition(...[position]: TSnakePlayerSetPositionProps) {
    this.props.position = new Position(position)
  }

  public setAction(...[action]: TSnakePlayerSetActionProps) {
    if (this.isSnakeDirection(action)) this.setDirection(action)
  }

  public setDirection(...[direction]: TSnakePlayerSetDirectionProps) {
    this.props.direction = direction
  }

  public grow() {
    const tail = this.bodySegment[this.bodySegment.length - 1]
    this.bodySegment.push({ ...tail })
  }

  public init(...[scene]: TSnakePlayerInitProps) {
    this.segmentPool = new Pool(new SnakeSegment(scene, this.props.tileSize))
  }

  public update() {
    this.bodySegment.unshift(this.position)
    this.bodySegment.pop()
  }

  public render() {
    if (!this.segmentPool) return
    this.segmentPool.sync(this.bodySegment.length)

    this.bodySegment.forEach((segment, index) => {
      this.segmentPool.actives[index].setPosition(segment.x * this.props.tileSize, segment.y * this.props.tileSize)
    })
  }

  public destroy() {
    if (!this.segmentPool) return
    this.segmentPool.actives.forEach((segment) => segment.destroy())
  }

  public get body() {
    return this.bodySegment
  }

  public get tail() {
    return _.tail(this.bodySegment)
  }
}
