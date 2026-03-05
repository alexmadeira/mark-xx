import type { IPool } from '@/interfaces/game/infra/pool'
import type { TSnakeFood } from '@GAMETypes/snake/entity/snake-food'
import type { TSnakePlayerSegment } from '@GAMETypes/snake/entity/snake-player'

import { Pool } from '_GAME/core/infra/pool'
import { SnakeGame } from '_GAME/snake/application/snake-game'
import { FoodObject } from '_GAME/snake/infra/game-objects/food-object'
import { GridObject } from '_GAME/snake/infra/game-objects/grid-object'
import { SnakeObject } from '_GAME/snake/infra/game-objects/snake-object'
import { Scene } from 'phaser'

import { FoodTexture } from './game-textures/food-texture'
import { GridTexture } from './game-textures/grid-texture'
import { SnakeTexture } from './game-textures/snake-texture'

export class GameRender {
  private readonly gridTexture: GridTexture
  private readonly foodTexture: FoodTexture
  private readonly snakeTexture: SnakeTexture

  private readonly gridObject: GridObject
  private readonly foodObject: FoodObject
  private readonly snakeObject: SnakeObject

  private readonly foodPool: IPool<TSnakeFood>
  private readonly snakePool: IPool<TSnakePlayerSegment>

  constructor(
    scene: Scene,
    private readonly game: SnakeGame,
    private readonly tileSize: number,
  ) {
    this.gridTexture = new GridTexture('grid', { scene, tileSize })
    this.foodTexture = new FoodTexture('food', { scene, tileSize })
    this.snakeTexture = new SnakeTexture('snake', { scene, tileSize })

    this.gridObject = new GridObject(this.gridTexture, { scene })
    this.foodObject = new FoodObject(this.foodTexture, { scene })
    this.snakeObject = new SnakeObject(this.snakeTexture, { scene })

    this.foodPool = new Pool(this.foodObject)
    this.snakePool = new Pool(this.snakeObject)
  }

  private get food() {
    return this.game.food
  }

  private get snake() {
    return this.game.snake
  }

  public init() {
    this.gridObject.create()
  }

  public update() {
    if (!this.snakePool || !this.foodPool) return

    this.snakePool.sync(this.snake.body.length)
    this.foodPool.sync(1)

    this.foodPool.head.setPosition(this.food.position.x * this.tileSize, this.food.position.y * this.tileSize)

    this.snake.body.forEach((segment, index) => {
      this.snakePool.actives[index].setPosition(segment.x * this.tileSize, segment.y * this.tileSize)
    })
  }
}
