import { ZSnakeGameFood, ZSnakeGameScene } from '@GAMETypes/snake/game'
import { z } from 'zod/v4'

export const ZSnakeFood = ZSnakeGameFood

export const ZSnakeFoodInitProps = z.tuple([ZSnakeGameScene])
export const ZSnakeGameFoodProps = z.object({
  tileSize: z.number(),
  gridWidth: z.number(),
  gridHeight: z.number(),
})

//
//
//
//

export type TSnakeFood = z.infer<typeof ZSnakeFood>

export type TSnakeFoodInitProps = z.infer<typeof ZSnakeFoodInitProps>
export type TSnakeFoodProps = z.infer<typeof ZSnakeGameFoodProps>
