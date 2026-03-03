import { Position } from '_GAME/core/value-object/position'
import { SnakeKeyboardInput } from '_GAME/snake/application/input/snake-keyboard-input'
import { SnakeFood } from '_GAME/snake/entity/snake-food'
import { SnakePlayer } from '_GAME/snake/entity/snake-player'
import { SnakeCollisionService } from '_GAME/snake/services/snake-collision-service'
import _ from 'lodash'
import Phaser from 'phaser'

import { snakeEvent } from '_SRV/builder/event'

import { SnakeRenderService } from '../services/snake-render.service'

export class GameScene extends Phaser.Scene {
  private food!: SnakeFood
  private player!: SnakePlayer
  private collision!: SnakeCollisionService
  private keyboardInput!: SnakeKeyboardInput
  private renderService!: SnakeRenderService

  private moveTime = 0
  private speed = 100

  constructor(
    private readonly tileSize: number,
    private readonly tileCount: number,
  ) {
    super('GameScene')
  }

  init() {
    const startPosition = new Position(Math.floor(this.tileCount / 2), Math.floor(this.tileCount / 2))

    this.keyboardInput = new SnakeKeyboardInput()

    this.food = new SnakeFood({
      tileSize: this.tileSize,
      gridWidth: this.tileCount,
      gridHeight: this.tileCount,
    })

    this.player = new SnakePlayer({
      position: startPosition,
      tileSize: this.tileSize,
    })

    this.collision = new SnakeCollisionService({
      snake: this.player,
      maxWidth: this.tileCount,
      maxHeight: this.tileCount,
    })
    snakeEvent.emit('SNAKE:gameStart')
  }

  create() {
    this.moveTime = this.time.now
    this.cameras.main.setBackgroundColor('#000022')

    this.renderService = new SnakeRenderService(this, this.food, this.player, this.tileSize)
    this.renderService.init()

    this.keyboardInput.init(this.input.keyboard!)

    this.render()
  }

  update(time: number) {
    if (!this.player.alive) return
    if (time < this.moveTime) return
    this.moveTime = time + this.speed

    const action = this.keyboardInput.consume()
    if (action) this.player.setAction(action)

    this.step()
  }

  private eatFood() {
    if (!this.player.position.equals(this.food.position)) return

    this.player.grow()
    this.food.consume()
    this.food.respawn()
  }

  private collide() {
    if (this.collision.checkSelfCollision()) this.endGame()
  }

  private step() {
    this.player.move()
    this.collide()

    if (this.player.position.x < 0) this.player.setPosition(this.tileCount - 1, this.player.position.y)
    if (this.player.position.y < 0) this.player.setPosition(this.player.position.x, this.tileCount - 1)
    if (this.player.position.x >= this.tileCount) this.player.setPosition(0, this.player.position.y)
    if (this.player.position.y >= this.tileCount) this.player.setPosition(this.player.position.x, 0)

    this.eatFood()

    this.player.update()
    this.food.respawn()
    this.render()
  }

  private render() {
    this.renderService.render()
  }

  private endGame() {
    this.player.kill()
    this.gameOver()
  }

  private gameOver() {
    this.input.keyboard?.removeAllListeners()
    snakeEvent.emit('SNAKE:gameOver')
    this.scene.start('StartScene')
  }
}
