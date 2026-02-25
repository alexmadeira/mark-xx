import { ZSnakeGamePlayerSegment } from '@GAMETypes/snake/game'
import { z } from 'zod/v4'

export const ZSnakeSegmentOnAcquireProps = z.tuple([ZSnakeGamePlayerSegment])
export const ZSnakeSegmentOnReleaseProps = z.tuple([ZSnakeGamePlayerSegment])

//
//
//

export type TSnakeSegmentOnAcquireProps = z.infer<typeof ZSnakeSegmentOnAcquireProps>
export type TSnakeSegmentOnReleaseProps = z.infer<typeof ZSnakeSegmentOnReleaseProps>
