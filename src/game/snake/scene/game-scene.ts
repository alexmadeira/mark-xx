import { Position } from '_GAME/core/value-object/position'
import { SnakeKeyboardInput } from '_GAME/snake/application/input/snake-keyboard-input'
import { SnakeGame } from '_GAME/snake/application/snake-game'
import { SnakeFood } from '_GAME/snake/entity/snake-food'
import { SnakePlayer } from '_GAME/snake/entity/snake-player'
import { GameRender } from '_GAME/snake/infra/game-render'
import { SnakeCollision } from '_GAME/snake/services/snake-collision'
import { Scene } from 'phaser'

import { snakeEvent } from '_SRV/builder/event'

export class GameScene extends Scene {
  private food!: SnakeFood
  private player!: SnakePlayer
  private collision!: SnakeCollision
  private keyboardInput!: SnakeKeyboardInput
  private renderService!: GameRender
  private gameLogic!: SnakeGame

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

    this.collision = new SnakeCollision({
      snake: this.player,
      maxWidth: this.tileCount,
      maxHeight: this.tileCount,
    })

    this.gameLogic = new SnakeGame(this.food, this.player, this.collision, this.keyboardInput)
    this.renderService = new GameRender(this, this.gameLogic, this.tileSize)

    snakeEvent.emit('SNAKE:gameStart')
  }

  create() {
    this.cameras.main.setBackgroundColor('#000022')

    this.renderService.init()
    this.keyboardInput.init(this.input.keyboard!)

    this.time.addEvent({
      delay: this.speed,
      loop: true,
      callback: () => {
        this.gameLogic.update()
        this.renderService.update()
      },
    })
  }

  // private endGame() {
  //   this.player.kill()
  //   this.gameOver()
  // }

  // private gameOver() {
  //   this.input.keyboard?.removeAllListeners()
  //   snakeEvent.emit('SNAKE:gameOver')
  //   this.scene.start('StartScene')
  // }
}
