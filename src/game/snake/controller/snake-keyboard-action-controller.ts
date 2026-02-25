import type { TESnakeAction } from '@GAMETypes/enums/snake'
import type {
  TSnakeKeyboardActionInitProps,
  TSnakeKeyboardActionKeyboard,
} from '@GAMETypes/snake/controller/snake-keyboard-action'

import { snakeKeyAction } from '_GAME/config/snake'
import { KeyboardAction } from '_GAME/core/keyboard-action'

export class SnakeKeyboardActionController extends KeyboardAction<TESnakeAction> {
  private keyboard?: TSnakeKeyboardActionKeyboard

  constructor() {
    super(snakeKeyAction)
  }

  public init(...[keyboard]: TSnakeKeyboardActionInitProps) {
    this.keyboard = keyboard
    this.keyboard.on('keydown', this.setEventAction)
  }

  public update() {
    throw new Error('Method not implemented.')
  }

  public destroy() {
    this.keyboard?.off('keydown', this.setEventAction)
  }
}
