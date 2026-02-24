import type { TSnakeKeyActions, TSnakeOppositeDirection } from '@GAMETypes/snake/controller/snake-keyboard-action'

export const snakeKeyAction = {
  ArrowUp: 'UP',
  ArrowDown: 'DOWN',
  ArrowLeft: 'LEFT',
  ArrowRight: 'RIGHT',
} as const satisfies TSnakeKeyActions

export const snakeOppositeDirection = {
  UP: 'DOWN',
  DOWN: 'UP',
  LEFT: 'RIGHT',
  RIGHT: 'LEFT',
} as const satisfies TSnakeOppositeDirection<typeof snakeKeyAction>
