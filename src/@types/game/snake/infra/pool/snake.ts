import { ZSnakeGamePlayerSegment } from '@GAMETypes/snake/game'
import { z } from 'zod/v4'

export const ZSnakeOnAcquireProps = z.tuple([ZSnakeGamePlayerSegment])
export const ZSnakeOnReleaseProps = z.tuple([ZSnakeGamePlayerSegment])

//
//
//

export type TSnakeOnAcquireProps = z.infer<typeof ZSnakeOnAcquireProps>
export type TSnakeOnReleaseProps = z.infer<typeof ZSnakeOnReleaseProps>
