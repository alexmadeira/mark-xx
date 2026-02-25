import { Position } from '_GAME/core/value-object/position'
import { SnakeKeyboardInput } from '_GAME/snake/application/input/snake-keyboard-input'
import { SnakeScore } from '_GAME/snake/controller/snake-score'
import { SnakeFood } from '_GAME/snake/entity/snake-food'
import { SnakePlayer } from '_GAME/snake/entity/snake-player'
import { SnakeCollisionService } from '_GAME/snake/services/snake-collision-service'
import _ from 'lodash'
import Phaser from 'phaser'

export class GameScene extends Phaser.Scene {
  private tileSize = 20
  private tileCount = 20

  private food!: SnakeFood
  private score!: SnakeScore
  private player!: SnakePlayer
  private collision!: SnakeCollisionService
  private keyboardInput!: SnakeKeyboardInput

  private moveTime = 0
  private speed = 100

  constructor() {
    super('GameScene')
  }

  init() {
    const startPosition = new Position(Math.floor(this.tileCount / 2), Math.floor(this.tileCount / 2))

    this.score = new SnakeScore({ defaultPointValue: 1 })
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
  }

  create() {
    this.moveTime = this.time.now
    this.cameras.main.setBackgroundColor('#00f')

    this.food.init(this)
    this.score.init(this)
    this.player.init(this)
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

    this.score.addPoint()
    this.score.update()

    if (this.score.total === 5) {
      this.score.setPointValue(5)
    }
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
    this.render()
  }

  private render() {
    this.player.render()
    this.food.render()
  }

  private endGame() {
    this.player.kill()
    this.gameOver()
  }

  private gameOver() {
    this.input.keyboard?.removeAllListeners()
    this.scene.start('StartScene')
  }
}
