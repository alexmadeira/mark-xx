import type { IPosition } from '@GAMETypes/interfaces/value-object/position'

import { z } from 'zod/v4'

export const ZEntityProps = z.object({
  position: z.custom<IPosition>(),
})

//
//
//
//

export type TEntityProps = z.infer<typeof ZEntityProps>
