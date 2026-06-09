import type { IPool } from '@/interfaces/game/infra/pool'
import type { TSnakeFood } from '@GAMETypes/snake/entity/snake-food'
import type { TSnakePlayerSegment } from '@GAMETypes/snake/entity/snake-player'

import { Scene } from 'phaser'

import { Pool } from '_GAME/core/infra/pool'
import { Game } from '_GAME/snake/game'
import { FoodObject } from '_GAME/snake/infra/game-objects/food-object'
import { GridObject } from '_GAME/snake/infra/game-objects/grid-object'
import { SnakeObject } from '_GAME/snake/infra/game-objects/snake-object'

import { FoodTexture } from './infra/game-textures/food-texture'
import { GridTexture } from './infra/game-textures/grid-texture'
import { SnakeTexture } from './infra/game-textures/snake-texture'

export class GameRender {
  private gridTexture!: GridTexture
  private foodTexture!: FoodTexture
  private snakeTexture!: SnakeTexture

  private gridObject!: GridObject
  private foodObject!: FoodObject
  private snakeObject!: SnakeObject

  private foodPool!: IPool<TSnakeFood>
  private snakePool!: IPool<TSnakePlayerSegment>

  constructor(
    private readonly game: Game,
    private readonly tileSize: number,
  ) {}

  private get food() {
    return this.game.food
  }

  private get snake() {
    return this.game.snake
  }

  private buildTextures(scene: Scene) {
    if (!this.gridTexture) this.gridTexture = new GridTexture('grid', { scene, tileSize: this.tileSize })
    if (!this.foodTexture) this.foodTexture = new FoodTexture('food', { scene, tileSize: this.tileSize })
    if (!this.snakeTexture) this.snakeTexture = new SnakeTexture('snake', { scene, tileSize: this.tileSize })
  }

  private buildObjects(scene: Scene) {
    if (!this.gridObject) this.gridObject = new GridObject(this.gridTexture, { scene })
    if (!this.foodObject) this.foodObject = new FoodObject(this.foodTexture, { scene })
    if (!this.snakeObject) this.snakeObject = new SnakeObject(this.snakeTexture, { scene })
  }

  private buildPools() {
    if (!this.foodPool) this.foodPool = new Pool(this.foodObject)
    if (!this.snakePool) this.snakePool = new Pool(this.snakeObject)
  }

  public init(scene: Scene) {
    this.buildTextures(scene)
    this.buildObjects(scene)
    this.buildPools()
  }

  public create() {
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
