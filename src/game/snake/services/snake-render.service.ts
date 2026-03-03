import type { IPool } from '@/interfaces/game/infra/pool'
import type { TSnakeFood } from '@GAMETypes/snake/entity/snake-food'
import type { TSnakePlayerSegment } from '@GAMETypes/snake/entity/snake-player'

import { Pool } from '_GAME/core/infra/pool'
import Phaser from 'phaser'

import { SnakeFood } from '../entity/snake-food'
import { SnakePlayer } from '../entity/snake-player'
import { Food } from '../infra/pool/food'
import { SnakeSegment } from '../infra/pool/snake-segment'

export class SnakeRenderService {
  private scoreText!: Phaser.GameObjects.Text
  private snakePool!: IPool<TSnakePlayerSegment>
  private foodPool!: IPool<TSnakeFood>

  constructor(
    private scene: Phaser.Scene,
    private readonly food: SnakeFood,
    private readonly snake: SnakePlayer,
    private readonly cellSize: number,
  ) {}

  init() {
    this.createTextures()
    this.createGrid()
    this.createHUD()
    this.snakePool = new Pool(new SnakeSegment(this.scene))
    this.foodPool = new Pool(new Food(this.scene))
  }

  private createTextures() {
    const size = this.cellSize
    const graphics = this.scene.add.graphics()

    // Snake
    graphics.fillStyle(0x00ff00)
    graphics.fillRect(0, 0, size, size)
    graphics.lineStyle(2, 0x003300)
    graphics.strokeRect(0, 0, size, size)
    graphics.generateTexture('snake-body', size, size)
    graphics.clear()

    // Food
    graphics.fillStyle(0xff0000)
    graphics.fillRect(0, 0, size, size)
    graphics.lineStyle(2, 0x0000ff, 0.5)
    graphics.strokeRect(0, 0, size, size)
    graphics.generateTexture('food', size, size)

    graphics.destroy()
  }

  private createGrid() {
    const grid = this.scene.add.graphics()
    grid.lineStyle(1, 0x00ff00, 0.2)

    for (let x = 0; x < this.scene.scale.width; x += this.cellSize) {
      grid.lineBetween(x, 0, x, this.scene.scale.height)
    }

    for (let y = 0; y < this.scene.scale.height; y += this.cellSize) {
      grid.lineBetween(0, y, this.scene.scale.width, y)
    }
  }

  public render() {
    if (!this.snakePool || !this.foodPool) return
    this.snakePool.sync(this.snake.body.length)
    this.foodPool.sync(1)

    this.foodPool.head.setPosition(this.food.position.x * this.cellSize, this.food.position.y * this.cellSize)
    this.snake.body.forEach((segment, index) => {
      this.snakePool.actives[index].setPosition(segment.x * this.cellSize, segment.y * this.cellSize)
    })
  }

  updateFoodPosition(food: SnakeFood) {
    food.respawn()
  }

  private createHUD() {
    this.scoreText = this.scene.add.text(8, 8, 'SCORE: 0', {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#00ff00',
    })

    this.scoreText.setDepth(10)
  }

  updateScore(score: number) {
    this.scoreText.setText(`SCORE: ${score}`)
  }
}
