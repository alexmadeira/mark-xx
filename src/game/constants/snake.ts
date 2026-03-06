export const SNAKE_DIRECTIONS = ['UP', 'DOWN', 'LEFT', 'RIGHT'] as const
export const SNAKE_ACTIONS = [...SNAKE_DIRECTIONS] as const

export const SNAKE_GAME_STATES = ['MENU', 'RUNNING', 'GAME_OVER'] as const
