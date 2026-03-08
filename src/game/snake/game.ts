import type { GameController } from './game-controller'
import type { SnakeKeyboardInput } from '_GAME/snake/application/input/snake-keyboard-input'
import type { SnakeFood } from '_GAME/snake/entity/snake-food'
import type { SnakePlayer } from '_GAME/snake/entity/snake-player'
import type { SnakeCollision } from '_GAME/snake/services/snake-collision'

import { GameLogic } from '_GAME/core/application/game-logic'

export class Game extends GameLogic {
  private speed = 150
  private minInterval = 50

  private controller!: GameController

  constructor(
    private readonly collision: SnakeCollision,
    private readonly keyboardInput: SnakeKeyboardInput,
    public readonly food: SnakeFood,
    public readonly snake: SnakePlayer,
  ) {
    super()
  }

  private increaseSpeed() {
    this.speed = Math.max(this.minInterval, this.speed - 5)
    // const score = this.snake.length

    //  this.tickInterval = Math.max(
    //    this.minInterval,
    //    120 - score * 2
    //  )
  }

  private collisionHandler() {
    if (this.collision.checkSelfCollision()) this.gameOver()
    if (this.collision.checkWallCollision()) this.gameOver()
    // if (this.collision.checkWallCollision()) this.snake.setPosition(this.collision.contrarySide)
  }

  private updateFood() {
    if (this.snake.position.equals(this.food.position) || this.snake.nextPosition.equals(this.food.position)) {
      this.food.consume()
      this.snake.grow()
      this.increaseSpeed()
    }

    this.food.respawn()
  }

  private updateSnake() {
    this.snake.move()
  }

  private gameOver() {
    this.snake.kill()
    this.controller.gameOver()
  }

  private actionsHandler() {
    const action = this.keyboardInput.consume()
    if (!action) return
    this.snake.setAction(action)
  }

  public setController(controller: GameController) {
    this.controller = controller
  }

  public restart() {
    this.speed = 150
    this.food.init()
    this.snake.init()
  }

  public update() {
    this.actionsHandler()
    this.collisionHandler()

    this.updateFood()
    this.updateSnake()
  }

  public get tickInterval() {
    return this.speed
  }
}
