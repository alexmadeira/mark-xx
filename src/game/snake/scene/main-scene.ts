import type { SnakeKeyboardInput } from '../application/input/snake-keyboard-input'
import type { ScoreSystem } from '../systems/score-system'

import { Scene } from 'phaser'

import { Game } from '_GAME/snake/game'
import { GameRender } from '_GAME/snake/game-render'

import { GameController } from '../game-controller'

export class MainScene extends Scene {
  private lastUpdate = 0

  constructor(
    private readonly controller: GameController,
    private readonly gameLogic: Game,
    private readonly gameRender: GameRender,
    private readonly scoreSystem: ScoreSystem,
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
    this.keyboardInput.init(this.input.keyboard!)

    this.gameRender.create()
    this.scoreSystem.create()

    this.controller.create(this)
  }

  public update(time: number) {
    if (time < this.lastUpdate) return
    this.lastUpdate = time + this.gameLogic.tickInterval

    this.controller.update()

    if (this.controller.state === 'RUNNING') {
      this.gameLogic.update()
    }

    this.gameRender.update()
  }
}
