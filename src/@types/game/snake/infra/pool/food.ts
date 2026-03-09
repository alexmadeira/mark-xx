import { ZSnakeGameFood } from '@GAMETypes/snake/game'
import { z } from 'zod/v4'

export const ZFoodOnAcquireProps = z.tuple([ZSnakeGameFood])
export const ZFoodOnReleaseProps = z.tuple([ZSnakeGameFood])

//
//
//

export type TFoodOnAcquireProps = z.infer<typeof ZFoodOnAcquireProps>
export type TFoodOnReleaseProps = z.infer<typeof ZFoodOnReleaseProps>
