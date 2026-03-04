import type { IPool } from '@/interfaces/game/infra/pool'
import type { TSnakeFood } from '@GAMETypes/snake/entity/snake-food'
import type { TSnakePlayerSegment } from '@GAMETypes/snake/entity/snake-player'

import { Pool } from '_GAME/core/infra/pool'
import { SnakeFood } from '_GAME/snake/entity/snake-food'
import { SnakePlayer } from '_GAME/snake/entity/snake-player'
import { FoodObject } from '_GAME/snake/infra/game-object/food-object'
import { GridObject } from '_GAME/snake/infra/game-object/grid-object'
import { SnakeObject } from '_GAME/snake/infra/game-object/snake-object'
import { Scene } from 'phaser'

export class GameRender {
  private foodPool: IPool<TSnakeFood>
  private snakePool: IPool<TSnakePlayerSegment>

  private readonly gridObject: GridObject
  private readonly foodObject: FoodObject
  private readonly snakeObject: SnakeObject

  constructor(
    private readonly scene: Scene,
    private readonly food: SnakeFood,
    private readonly snake: SnakePlayer,
    private readonly tileSize: number,
  ) {
    this.gridObject = new GridObject({ scene, texture: 'grid' })
    this.foodObject = new FoodObject({ scene, texture: 'food' })
    this.snakeObject = new SnakeObject({ scene, texture: 'snake' })

    this.foodPool = new Pool(this.foodObject)
    this.snakePool = new Pool(this.snakeObject)
  }

  public init() {
    this.createTextures()
    this.gridObject.create()
  }

  private createTextures() {
    const size = this.tileSize
    const graphics = this.scene.make.graphics({ x: 0, y: 0 }, false)

    // Snake
    graphics.fillStyle(0x00ff00)
    graphics.fillRect(0, 0, size, size)
    graphics.lineStyle(2, 0x003300)
    graphics.strokeRect(0, 0, size, size)
    graphics.generateTexture('snake', size, size)
    graphics.clear()

    // Food
    graphics.fillStyle(0xff0000)
    graphics.fillRect(0, 0, size, size)
    graphics.lineStyle(2, 0xff0000, 0.5)
    graphics.strokeRect(0, 0, size, size)
    graphics.generateTexture('food', size, size)
    graphics.clear()

    const width = this.scene.scale.width
    const height = this.scene.scale.height

    graphics.lineStyle(1, 0x00ff00, 0.2)

    for (let x = 0; x <= width; x += this.tileSize) {
      graphics.lineBetween(x, 0, x, height)
    }

    for (let y = 0; y <= height; y += this.tileSize) {
      graphics.lineBetween(0, y, width, y)
    }

    graphics.generateTexture('grid', width, height)
    graphics.destroy()
  }

  public render() {
    if (!this.snakePool || !this.foodPool) return

    this.snakePool.sync(this.snake.body.length)
    this.foodPool.sync(1)

    this.foodPool.head.setPosition(this.food.position.x * this.tileSize, this.food.position.y * this.tileSize)

    this.snake.body.forEach((segment, index) => {
      this.snakePool.actives[index].setPosition(segment.x * this.tileSize, segment.y * this.tileSize)
    })
  }
}
