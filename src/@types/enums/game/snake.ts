import { z } from 'zod'

import { SNAKE_ACTIONS, SNAKE_DIRECTIONS, SNAKE_GAME_STATES } from '_GAME/constants/snake'

export const ZESnakeAction = z.enum(SNAKE_ACTIONS)
export const ZESnakeDirection = z.enum(SNAKE_DIRECTIONS)
export const ZESnakeGameState = z.enum(SNAKE_GAME_STATES)

//
//
//
//

export type TESnakeAction = z.infer<typeof ZESnakeAction>
export type TESnakeDirection = z.infer<typeof ZESnakeDirection>
export type TESnakeGameState = z.infer<typeof ZESnakeGameState>
