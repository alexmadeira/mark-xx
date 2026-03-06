import type { SnakeKeyboardInput } from '../application/input/snake-keyboard-input'

import { Game } from '_GAME/snake/game'
import { GameRender } from '_GAME/snake/game-render'
import { Scene } from 'phaser'

import { GameController } from '../game-controller'

export class MainScene extends Scene {
  private speed = 100
  private lastUpdate = 0

  constructor(
    private readonly controller: GameController,
    private readonly gameLogic: Game,
    private readonly gameRender: GameRender,
    private readonly keyboardInput: SnakeKeyboardInput,
  ) {
    super('MAIN')
  }

  public init() {
    this.lastUpdate = 0
  }

  public create() {
    this.cameras.main.setBackgroundColor('#000022')

    this.gameRender.init(this)
    this.gameRender.create()

    this.keyboardInput.init(this.input.keyboard!)
    this.controller.create(this)
  }

  update(time: number) {
    if (time < this.lastUpdate) return
    this.lastUpdate = time + this.speed

    this.controller.update()

    if (this.controller.state === 'RUNNING') {
      this.gameLogic.update()
    }

    this.gameRender.update()
  }
}
