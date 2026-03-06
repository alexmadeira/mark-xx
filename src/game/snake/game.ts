import type { SnakeKeyboardInput } from '_GAME/snake/application/input/snake-keyboard-input'
import type { SnakeFood } from '_GAME/snake/entity/snake-food'
import type { SnakePlayer } from '_GAME/snake/entity/snake-player'
import type { GameState } from '_GAME/snake/game-state'
import type { SnakeCollision } from '_GAME/snake/services/snake-collision'

import { GameLogic } from '_GAME/core/application/game-logic'

export class Game extends GameLogic {
  constructor(
    private readonly gameState: GameState,
    private readonly collision: SnakeCollision,
    private readonly keyboardInput: SnakeKeyboardInput,
    public readonly food: SnakeFood,
    public readonly snake: SnakePlayer,
  ) {
    super()
  }

  private collisionHandler() {
    if (this.collision.checkSelfCollision()) this.gameOver('checkSelfCollision')
    // if (this.collision.checkWallCollision()) this.gameOver('checkWallCollision')
    if (this.collision.checkWallCollision()) this.snake.setPosition(this.collision.contrarySide)
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

  private gameOver(reson: string) {
    if (!this.snake.alive) return
    console.log(`Game Over! Reason: ${reson}`)
    this.snake.kill()
    this.gameState.transition('MENU')
  }

  private actionsHandler() {
    const action = this.keyboardInput.consume()
    if (!action) return

    switch (this.gameState.state) {
      case 'MENU':
        this.restart()
        this.gameState.transition('RUNNING')
        break
      case 'RUNNING':
        this.snake.setAction(action)
        break
      case 'GAME_OVER':
        break
    }
  }

  public restart() {
    console.log('Restarting game...')
    this.food.init()
    this.snake.init()
  }

  public update() {
    console.log('Updating game logic...')
    this.actionsHandler()
    this.collisionHandler()

    this.updateFood()
    this.updateSnake()
  }
}
