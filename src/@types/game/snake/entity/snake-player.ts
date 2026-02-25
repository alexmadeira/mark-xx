import type { IPosition } from '@GAMETypes/interfaces/value-object/position'

import { ZPlayerProps } from '@GAMETypes/core/palyer'
import { ZESnakeAction, ZESnakeDirection } from '@GAMETypes/enums/snake'
import { ZSnakeGamePlayer, ZSnakeGameScene } from '@GAMETypes/snake/game'
import { z } from 'zod/v4'

export const ZSnakePlayerAction = ZESnakeAction
export const ZSnakePlayerSegment = ZSnakeGamePlayer
export const ZSnakePlayerDirection = ZESnakeDirection

export const ZSnakePlayerPosition = z.custom<IPosition>()
export const ZSnakePlayerBodySegments = ZSnakePlayerPosition.array()

export const ZSnakePlayerInitProps = z.tuple([ZSnakeGameScene])
export const ZSnakePlayerSetPositionProps = z.tuple([z.number(), z.number()])
export const ZSnakePlayerSetActionProps = z.tuple([ZSnakePlayerAction])
export const ZSnakePlayerSetDirectionProps = z.tuple([ZSnakePlayerDirection])

export const ZSnakePlayerProps = z.object({
  ...ZPlayerProps.shape,
  direction: ZSnakePlayerDirection.optional(),
})

//
//
//
//

export type TSnakePlayerAction = z.infer<typeof ZSnakePlayerAction>
export type TSnakePlayerSegment = z.infer<typeof ZSnakePlayerSegment>
export type TSnakePlayerDirection = z.infer<typeof ZSnakePlayerDirection>

export type TSnakePlayerPosition = z.infer<typeof ZSnakePlayerPosition>
export type TSnakePlayerBodySegments = z.infer<typeof ZSnakePlayerBodySegments>

export type TSnakePlayerInitProps = z.infer<typeof ZSnakePlayerInitProps>
export type TSnakePlayerSetPositionProps = z.infer<typeof ZSnakePlayerSetPositionProps>
export type TSnakePlayerSetActionProps = z.infer<typeof ZSnakePlayerSetActionProps>
export type TSnakePlayerSetDirectionProps = z.infer<typeof ZSnakePlayerSetDirectionProps>

export type TSnakePlayerProps = z.infer<typeof ZSnakePlayerProps>
