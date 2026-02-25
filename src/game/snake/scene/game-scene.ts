import type { TESnakeDirection } from '@GAMETypes/enums/snake'

import { Position } from '_GAME/core/value-object/position'
import { SnakeCollisionController } from '_GAME/snake/controller/snake-collision-controller'
import { SnakeFood } from '_GAME/snake/entity/snake-food'
import { SnakePlayer } from '_GAME/snake/entity/snake-player'
import _ from 'lodash'
import Phaser from 'phaser'

import { SnakeKeyboardActionController } from '../controller/snake-keyboard-action-controller'

export class GameScene extends Phaser.Scene {
  private tileSize = 20
  private tileCount = 20

  private food!: SnakeFood
  private player!: SnakePlayer
  private collision!: SnakeCollisionController
  private actionController!: SnakeKeyboardActionController

  private moveTime = 0
  private speed = 150

  constructor() {
    super('GameScene')
  }

  init(data: { direction?: TESnakeDirection }) {
    const startPosition = new Position({
      x: Math.floor(this.tileCount / 2),
      y: Math.floor(this.tileCount / 2),
    })

    this.actionController = new SnakeKeyboardActionController()
    this.food = new SnakeFood({
      tileSize: this.tileSize,
      gridWidth: this.tileCount,
      gridHeight: this.tileCount,
    })

    this.player = new SnakePlayer({
      position: startPosition,
      tileSize: this.tileSize,
      direction: data.direction || 'RIGHT',
    })

    this.collision = new SnakeCollisionController({
      gridWidth: this.tileCount,
      gridHeight: this.tileCount,
    })
  }

  create() {
    this.cameras.main.setBackgroundColor('#00f')

    this.food.init(this)
    this.player.init(this)
    this.actionController.init(this.input.keyboard!)

    this.moveTime = this.time.now
    this.render()
  }

  update(time: number) {
    if (!this.player.alive) return
    if (time < this.moveTime) return
    this.moveTime = time + this.speed

    const action = this.actionController.consume()
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
    if (this.collision.whithObstacle(this.player.position)) {
      this.player.kill()
      this.gameOver()
    }
  }

  private step() {
    this.player.move()

    if (this.player.position.x < 0) this.player.setPosition({ x: this.tileCount - 1, y: this.player.position.y })
    if (this.player.position.y < 0) this.player.setPosition({ x: this.player.position.x, y: this.tileCount - 1 })
    if (this.player.position.x >= this.tileCount) this.player.setPosition({ x: 0, y: this.player.position.y })
    if (this.player.position.y >= this.tileCount) this.player.setPosition({ x: this.player.position.x, y: 0 })

    this.collision.updateObstacle(this.player.tail)

    this.eatFood()
    this.collide()

    this.player.update()
    this.render()
  }

  private render() {
    this.player.render()
    this.food.render()
  }

  private gameOver() {
    this.input.keyboard?.removeAllListeners()
    this.scene.start('StartScene')
  }
}
