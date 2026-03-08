import type { GameController } from './game-controller'
import type { ScoreSystem } from './systems/score-system'
import type { SnakeKeyboardInput } from '_GAME/snake/application/input/snake-keyboard-input'
import type { SnakeFood } from '_GAME/snake/entity/snake-food'
import type { SnakePlayer } from '_GAME/snake/entity/snake-player'
import type { SnakeCollision } from '_GAME/snake/services/snake-collision'

import { GameLogic } from '_GAME/core/application/game-logic'

export class Game extends GameLogic {
  private speed = 0
  private speedRatio = 4
  private baseSpeed = 120
  private minInterval = 50

  private controller!: GameController

  constructor(
    private readonly scoreSystem: ScoreSystem,
    private readonly collision: SnakeCollision,
    private readonly keyboardInput: SnakeKeyboardInput,
    public readonly food: SnakeFood,
    public readonly snake: SnakePlayer,
  ) {
    super()
  }

  private updateSpeed() {
    const factor = Math.sqrt(this.scoreSystem.value)

    this.speed = Math.max(this.minInterval, this.baseSpeed - factor * this.speedRatio)
  }

  private collisionHandler() {
    if (this.collision.checkSelfCollision()) this.gameOver()
    if (this.collision.checkWallCollision()) this.gameOver()
  }

  private updateFood() {
    if (this.snake.position.equals(this.food.position) || this.snake.nextPosition.equals(this.food.position)) {
      this.snake.grow()
      this.food.consume()
      this.updateSpeed()
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
    this.speed = this.baseSpeed
    this.food.init()
    this.snake.init()
    this.scoreSystem.reset()
  }

  public update() {
    console.log(this.speed)
    this.actionsHandler()
    this.collisionHandler()

    this.updateFood()
    this.updateSnake()
  }

  public get tickInterval() {
    return this.speed
  }

  public get score() {
    return this.scoreSystem.value
  }
}
