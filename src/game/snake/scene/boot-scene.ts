import { SnakeKeyboardInput } from '../application/input/snake-keyboard-input'
import { GameController } from '../game-controller'

export class BootScene extends Phaser.Scene {
  constructor(
    private controller: GameController,
    private readonly keyboardInput: SnakeKeyboardInput,
  ) {
    super('BOOT')
  }

  create() {
    console.log('Initializing keyboard input...')

    this.keyboardInput.init(this.input.keyboard!)
    this.controller.init(this.game)
  }
}
