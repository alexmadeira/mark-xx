import { ZSnakePlayerSegment } from '@GAMETypes/snake/entity/snake-player'
import { z } from 'zod/v4'

export const ZSnakeSegmentOnAcquireProps = z.tuple([ZSnakePlayerSegment])
export const ZSnakeSegmentOnReleaseProps = z.tuple([ZSnakePlayerSegment])

//
//
//

export type TSnakeSegmentOnAcquireProps = z.infer<typeof ZSnakeSegmentOnAcquireProps>
export type TSnakeSegmentOnReleaseProps = z.infer<typeof ZSnakeSegmentOnReleaseProps>
