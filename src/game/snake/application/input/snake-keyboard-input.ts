import type { TESnakeAction } from '@GAMETypes/enums/snake'
import type {
  TSnakeKeyboardInput,
  TSnakeKeyboardInputInitProps,
} from '@GAMETypes/snake/application/input/snake-keyboard-input'

import { snakeKeyAction } from '_GAME/config/snake'
import { KeyboardInput } from '_GAME/core/application/input/keyboard-input'

export class SnakeKeyboardInput extends KeyboardInput<TESnakeAction> {
  private input?: TSnakeKeyboardInput

  constructor() {
    super(snakeKeyAction)
  }

  public init(...[input]: TSnakeKeyboardInputInitProps) {
    this.input = input
    this.input.on('keydown', this.setEventAction)
  }

  public update() {
    throw new Error('Method not implemented.')
  }

  public destroy() {
    this.input?.off('keydown', this.setEventAction)
  }
}
