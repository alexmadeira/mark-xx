import { ZScoreProps } from '@GAMETypes/core/score'
import { z } from 'zod/v4'

import { ZSnakeGameScene } from '../game'

export const ZSnakeScoreInitProps = z.tuple([ZSnakeGameScene])
export const ZSnakeScoreProps = z.object({
  ...ZScoreProps.shape,
})
//
//
//
//

export type TSnakeScoreInitProps = z.infer<typeof ZSnakeScoreInitProps>
export type TSnakeScoreProps = z.infer<typeof ZSnakeScoreProps>
