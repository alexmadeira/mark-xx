import { z } from 'zod/v4'

import { ZSnakeGameFood } from '@GAMETypes/snake/game'

export const ZFoodOnAcquireProps = z.tuple([ZSnakeGameFood])
export const ZFoodOnReleaseProps = z.tuple([ZSnakeGameFood])

//
//
//

export type TFoodOnAcquireProps = z.infer<typeof ZFoodOnAcquireProps>
export type TFoodOnReleaseProps = z.infer<typeof ZFoodOnReleaseProps>
