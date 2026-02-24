import type { TPosition } from '@GAMETypes/interfaces/value-object/position'

import { z } from 'zod/v4'

export const ZSnakePositionProps = z.custom<TPosition>()

//
//
//
//

export type TSnakePositionProps = z.infer<typeof ZSnakePositionProps>
