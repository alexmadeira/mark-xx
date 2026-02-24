import type { IPosition } from '@GAMETypes/interfaces/value-object/position'

import { z } from 'zod/v4'

export const ZCollisionAddObstacleProps = z.tuple([z.custom<IPosition>()])
export const ZCollisionRemoveObstacleProps = z.tuple([z.custom<IPosition>()])
export const ZCollisionUpdateObstacleProps = z.tuple([z.custom<IPosition>().array()])
export const ZCollisionWhithGridEndsProps = z.tuple([z.custom<IPosition>()])
export const ZCollisionWhithObstacleEndsProps = z.tuple([z.custom<IPosition>()])

export const ZCollisionProps = z.object({
  gridWidth: z.number(),
  gridHeight: z.number(),
})

//
//
//
//

export type TCollisionAddObstacleProps = z.infer<typeof ZCollisionAddObstacleProps>
export type TCollisionRemoveObstacleProps = z.infer<typeof ZCollisionRemoveObstacleProps>
export type TCollisionUpdateObstacleProps = z.infer<typeof ZCollisionUpdateObstacleProps>
export type TCollisionWhithGridEndsProps = z.infer<typeof ZCollisionWhithGridEndsProps>
export type TCollisionWhithObstacleEndsProps = z.infer<typeof ZCollisionWhithObstacleEndsProps>

export type TCollisionProps = z.infer<typeof ZCollisionProps>
