import type { IPosition } from '@GAMETypes/interfaces/value-object/position'

import { z } from 'zod/v4'

import { ZEntityProps } from './entity'

export const ZObjectiveSpawnProps = z.tuple([z.custom<IPosition>()])

export const ZObjectiveProps = z.object({
  ...ZEntityProps.shape,
  active: z.boolean(),
})

//
//
//
//

export type TObjectiveSpawnProps = z.infer<typeof ZObjectiveSpawnProps>

export type TObjectiveProps = z.infer<typeof ZObjectiveProps>
