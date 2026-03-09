import type { TSnakeKeyActions } from '@GAMETypes/snake/application/input/snake-keyboard-input'

export const snakeKeyAction = {
  ArrowUp: 'UP',
  ArrowDown: 'DOWN',
  ArrowLeft: 'LEFT',
  ArrowRight: 'RIGHT',
} as const satisfies TSnakeKeyActions

export const oppositeDirection = {
  UP: 'DOWN',
  DOWN: 'UP',
  LEFT: 'RIGHT',
  RIGHT: 'LEFT',
} as const
