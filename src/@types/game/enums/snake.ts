import { SNAKE_ACTIONS, SNAKE_DIRECTIONS } from '_GAME/constants/snake'
import { z } from 'zod'

export const ZESnakeDirection = z.enum(SNAKE_DIRECTIONS)
export const ZESnakeAction = z.enum(SNAKE_ACTIONS)

//
//
//
//

export type TESnakeDirection = z.infer<typeof ZESnakeDirection>
export type TESnakeAction = z.infer<typeof ZESnakeAction>
