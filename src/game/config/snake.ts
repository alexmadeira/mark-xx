import type { TSnakeKeyActions } from '@GAMETypes/snake/controller/snake-keyboard-action'

export const snakeKeyAction = {
  ArrowUp: 'UP',
  ArrowDown: 'DOWN',
  ArrowLeft: 'LEFT',
  ArrowRight: 'RIGHT',
} as const satisfies TSnakeKeyActions
