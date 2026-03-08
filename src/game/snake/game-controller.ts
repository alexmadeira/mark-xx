import type { SnakeKeyboardInput } from './application/input/snake-keyboard-input'
import type { Game } from './game'
import type { Scene } from 'phaser'

import { snakeEvent } from '_SRV/builder/event'

import { GameUI } from './ui/game-ui'
import { GameOverUI } from './ui/gameover-ui'
import { MenuUI } from './ui/menu-ui'

export class GameController {
  public state: 'MENU' | 'RUNNING' | 'GAME_OVER' = 'MENU'

  private menuUI!: MenuUI
  private gameUI!: GameUI
  private gameOverUI!: GameOverUI
  constructor(
    private gameLogic: Game,
    private readonly keyboardInput: SnakeKeyboardInput,
  ) {}

  create(scene: Scene) {
    this.menuUI = new MenuUI(scene)
    this.menuUI.create()
    this.menuUI.setVisible(true)

    this.gameUI = new GameUI(scene)
    this.gameUI.create()
    this.gameUI.setVisible(false)

    this.gameOverUI = new GameOverUI(scene)
    this.gameOverUI.create(0)
    this.gameOverUI.setVisible(false)

    scene.input.keyboard?.on('keydown', (event: KeyboardEvent) => {
      if (['MENU', 'GAME_OVER'].includes(this.state)) {
        this.keyboardInput?.clear()
        if (['Enter'].includes(event.key)) {
          this.startGame()
        }
      }
    })
  }

  update() {
    switch (this.state) {
      case 'MENU':
        this.menuUI.setVisible(true)
        this.gameUI.setVisible(false)
        this.gameOverUI.setVisible(false)
        break
      case 'RUNNING':
        this.menuUI.setVisible(false)
        this.gameUI.setVisible(true)
        this.gameOverUI.setVisible(false)
        break
      case 'GAME_OVER':
        this.menuUI.setVisible(false)
        this.gameUI.setVisible(false)
        this.gameOverUI.setVisible(true)
        break
    }
  }

  startGame() {
    this.state = 'RUNNING'
    this.gameLogic.restart()
    snakeEvent.emit('SNAKE:GAME_STATE:transition', this.state)
  }

  gameOver() {
    this.state = 'GAME_OVER'
    snakeEvent.emit('SNAKE:GAME_STATE:transition', this.state)
  }

  backToMenu() {
    this.state = 'MENU'
    snakeEvent.emit('SNAKE:GAME_STATE:transition', this.state)
  }
}
