import type { IPool } from '@GAMETypes/interfaces/value-object/pool'
import type { TSnakeFood, TSnakeFoodProps } from '@GAMETypes/snake/entity/snake-food'
import type { TSnakePlayerInitProps } from '@GAMETypes/snake/entity/snake-player'

import { Objective } from '_GAME/core/objective'
import { Pool } from '_GAME/core/value-object/pool'
import { Position } from '_GAME/core/value-object/position'
import { Food } from '_GAME/snake/pool/food'
import _ from 'lodash'

export class SnakeFood extends Objective<TSnakeFoodProps> {
  private foodPool!: IPool<TSnakeFood>

  constructor(props: TSnakeFoodProps) {
    super({
      ...props,
      active: true,
      position: new Position({ x: -1, y: -1 }),
    })
  }

  private randomPosition() {
    return {
      y: Math.floor(Math.random() * this.props.gridHeight),
      x: Math.floor(Math.random() * this.props.gridWidth),
    }
  }

  public respawn() {
    const position = new Position(this.randomPosition())
    this.spawn(position)
  }

  public init(...[scene]: TSnakePlayerInitProps) {
    this.foodPool = new Pool(new Food(scene, this.props.tileSize))

    this.respawn()
  }

  public update() {}

  public render() {
    if (!this.active || !this.foodPool) return
    const foods = this.foodPool.sync(1)

    foods.forEach((food) => {
      food.setPosition(this.position.x * this.props.tileSize, this.position.y * this.props.tileSize)
    })
  }

  public destroy() {
    if (!this.foodPool) return
    this.foodPool.actives.forEach((food) => food.destroy())
  }
}
