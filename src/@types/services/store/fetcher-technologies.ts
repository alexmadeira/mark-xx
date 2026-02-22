import { ZEFetcherStatus } from '@/enums/fetcher'

import { z } from 'zod/v4'

import { ZSchemaUIImageSRC } from '../schema/image'

export const ZStoreFetcherTechnology = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  type: z.string(),
  banner: ZSchemaUIImageSRC.optional(),
})

export const ZStoreFetcherTechnologiesData = z.object({
  list: ZStoreFetcherTechnology.array(),
  status: ZEFetcherStatus,
})
export const ZStoreFetcherTechnologiesActions = z.object({
  setList: z.custom<(technologies: z.infer<typeof ZStoreFetcherTechnology>[]) => void>(),
  setStatus: z.custom<(status: z.infer<typeof ZEFetcherStatus>) => void>(),
})
export const ZStoreFetcherTechnologies = z.object({
  data: ZStoreFetcherTechnologiesData,
  actions: ZStoreFetcherTechnologiesActions,
})

//
//
//
//

export type TStoreFetcherTechnology = z.infer<typeof ZStoreFetcherTechnology>
export type TStoreFetcherTechnologiesData = z.infer<typeof ZStoreFetcherTechnologiesData>
export type TStoreFetcherTechnologiesActions = z.infer<typeof ZStoreFetcherTechnologiesActions>
export type TStoreFetcherTechnologies = z.infer<typeof ZStoreFetcherTechnologies>
