// import type { Game } from 'phaser'

import type { SnakeKeyboardInput } from './application/input/snake-keyboard-input'
import type { Game } from './game'
import type { Scene } from 'phaser'

import { GameUI } from './ui/game-ui'
import { GameOverUI } from './ui/gameover-ui'
// export class GameController {
//   private initialized = false
//   init(game: Game) {
//     if (this.initialized) return
//     this.initialized = true
//     game.scene.start('MENU')
//     snakeEvent.on('SNAKE:GAME_STATE:transition', (state) => {
//       console.log('Transitioning to state:', state)
//       switch (state) {
//         case 'MENU':
//           game.scene.stop('GAME')
//           game.scene.start('MENU')
//           break
//         // case 'GAME_OVER':
//         //   game.scene.stop('GAME')
//         //   game.scene.start('GAME')
//         //   break
//         case 'RUNNING':
//           game.scene.stop('MENU')
//           game.scene.start('GAME')
//           break
//       }
//     })
//   }
// }
// export class GameController {
//   public state: 'MENU' | 'RUNNING' | 'GAME_OVER' = 'MENU'
//   private scene!: Phaser.Scene
//   private initialized = false
//   public init(scene: Phaser.Scene) {
//     if (this.initialized) return
//     this.initialized = true
//     this.scene = scene
//     snakeEvent.on('SNAKE:GAME_STATE:transition', (state) => {
//       this.state = state
//     })
//   }
//   public update() {
//     switch (this.state) {
//       case 'MENU':
//         break
//       case 'RUNNING':
//         break
//       case 'GAME_OVER':
//         break
//     }
//   }
// }
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

    // Inicializa controle de teclado para iniciar o jogo
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
  }

  gameOver() {
    this.state = 'GAME_OVER'
  }

  backToMenu() {
    this.state = 'MENU'
  }
}
