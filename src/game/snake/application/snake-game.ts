import type { SnakeFood } from '../entity/snake-food'
import type { SnakeKeyboardInput } from './input/snake-keyboard-input'
import type { SnakePlayer } from '_GAME/snake/entity/snake-player'
import type { SnakeCollision } from '_GAME/snake/services/snake-collision'

export class SnakeGame {
  constructor(
    public readonly food: SnakeFood,
    public readonly snake: SnakePlayer,
    private readonly collision: SnakeCollision,
    private readonly keyboardInput: SnakeKeyboardInput,
  ) {}

  private collisionHandler() {
    if (this.collision.checkSelfCollision()) this.snake.kill()
    if (this.collision.checkWallCollision()) this.snake.setPosition(...this.collision.contrarySide)
  }

  private updateFood() {
    if (this.snake.position.equals(this.food.position) || this.snake.nextPosition.equals(this.food.position)) {
      this.food.consume()
      this.snake.grow()
    }

    this.food.respawn()
  }

  private updateSnake() {
    this.snake.move()
  }

  private actionsHandler() {
    const action = this.keyboardInput.consume()
    if (action) this.snake.setAction(action)
  }

  public update() {
    this.actionsHandler()
    this.collisionHandler()

    this.updateSnake()
    this.updateFood()
  }
}
