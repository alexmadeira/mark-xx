import type { SnakeKeyboardInput } from '../application/input/snake-keyboard-input'
import type { SoundSystem } from '../sound-system'

import { Game } from '_GAME/snake/game'
import { GameRender } from '_GAME/snake/game-render'
import { Scene } from 'phaser'

import { GameController } from '../game-controller'

export class MainScene extends Scene {
  private lastUpdate = 0

  constructor(
    private readonly controller: GameController,
    private readonly gameLogic: Game,
    private readonly gameRender: GameRender,
    private readonly soundSystem: SoundSystem,
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
    this.soundSystem.create(this)

    this.events.once('shutdown', () => {
      this.soundSystem.destroy()
    })
  }

  update(time: number) {
    if (time < this.lastUpdate) return
    this.lastUpdate = time + this.gameLogic.tickInterval

    this.controller.update()

    if (this.controller.state === 'RUNNING') {
      this.gameLogic.update()
    }

    this.gameRender.update()
  }
}
