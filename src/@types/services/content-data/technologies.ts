import { ZETechnologyKey } from '@/enums/technology'

import { z } from 'zod/v4'

export const ZDataTechnology = z.object({
  id: z.string(),
  name: z.string(),
  banner: z.string(),
  usage: z.number(),
  color: z.string(),
  typing: z.string(),
})

export const ZDataTechnologies = z.record(ZETechnologyKey, ZDataTechnology)

//
//
//
//

export type TDataTechnology = z.infer<typeof ZDataTechnology>
export type TDataTechnologies = z.infer<typeof ZDataTechnologies>
