import type { TScoreProps } from '@/interfaces/game/entity/score'

import { z } from 'zod/v4'

import { ZSnakeGameScene } from '../game'

export const ZSnakeScoreInitProps = z.tuple([ZSnakeGameScene])
export const ZSnakeScoreProps = z.custom<TScoreProps>()
//
//
//
//

export type TSnakeScoreInitProps = z.infer<typeof ZSnakeScoreInitProps>
export type TSnakeScoreProps = z.infer<typeof ZSnakeScoreProps>
