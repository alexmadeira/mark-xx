import { ZSnakePlayerSegment } from '@GAMETypes/snake/entity/snake-player'
import { z } from 'zod/v4'

export const ZFoodOnAcquireProps = z.tuple([ZSnakePlayerSegment])
export const ZFoodOnReleaseProps = z.tuple([ZSnakePlayerSegment])

//
//
//

export type TFoodOnAcquireProps = z.infer<typeof ZFoodOnAcquireProps>
export type TFoodOnReleaseProps = z.infer<typeof ZFoodOnReleaseProps>
