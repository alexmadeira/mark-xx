import { z } from 'zod/v4'

export const ZSnakeCollisionProps = z.object({
  gridWidth: z.number(),
  gridHeight: z.number(),
})
//
//
//
//

export type TSnakeCollisionProps = z.infer<typeof ZSnakeCollisionProps>
