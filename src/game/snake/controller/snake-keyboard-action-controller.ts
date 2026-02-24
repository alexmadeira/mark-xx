import type {
  TSnakeKeyboardActionInitProps,
  TSnakeKeyboardActionKeyboard,
  TSnakeKeyboardActionSetActionProps,
  TSnakeOppositeDirection,
} from '@GAMETypes/snake/controller/snake-keyboard-action'

import { snakeKeyAction, snakeOppositeDirection } from '_GAME/config/snake'
import { KeyboardAction } from '_GAME/core/keyboard-action'

export class SnakeKeyboardActionController extends KeyboardAction<typeof snakeKeyAction> {
  private keyboard?: TSnakeKeyboardActionKeyboard
  private opposite: TSnakeOppositeDirection<typeof snakeKeyAction> = snakeOppositeDirection

  constructor() {
    super(snakeKeyAction)
  }

  protected setAction(...[action]: TSnakeKeyboardActionSetActionProps<typeof snakeKeyAction>) {
    if (this.action && this.opposite[this.action] === action) return
    super.setAction(action)
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
