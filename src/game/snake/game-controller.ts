import type { SnakeKeyboardInput } from './application/input/snake-keyboard-input'
import type { Game } from './game'
import type { Scene, Sound } from 'phaser'

import { GameUI } from './ui/game-ui'
import { GameOverUI } from './ui/gameover-ui'
import { MenuUI } from './ui/menu-ui'

export class GameController {
  public state: 'MENU' | 'RUNNING' | 'GAME_OVER' = 'MENU'

  private menuUI!: MenuUI
  private gameUI!: GameUI
  private gameOverUI!: GameOverUI
  private bgMusic?: Sound.BaseSound
  private eatSound?: Sound.BaseSound
  private moveSound?: Sound.BaseSound

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

    this.bgMusic = scene.sound.add('music', {
      loop: true,
      volume: 0.2,
    })

    this.eatSound = scene.sound.add('eat', {
      volume: 0.2,
    })
    this.moveSound = scene.sound.add('move', {
      volume: 0.01,
    })

    this.eatSound = scene.sound.add('eat', {
      volume: 0.2,
    })

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

  playEatSound() {
    this.eatSound?.play({
      rate: Phaser.Math.FloatBetween(0.9, 1.1),
    })
  }

  playMoveSound() {
    this.moveSound?.play({
      rate: Phaser.Math.FloatBetween(0.95, 1.05),
    })
  }

  startGame() {
    this.state = 'RUNNING'
    this.bgMusic?.play()
    this.gameLogic.restart()
  }

  gameOver() {
    this.bgMusic?.stop()
    this.state = 'GAME_OVER'
  }

  backToMenu() {
    this.bgMusic?.stop()
    this.state = 'MENU'
  }
}
