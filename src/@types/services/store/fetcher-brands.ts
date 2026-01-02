import { ZEFetcherStatus } from '@/enums/fetcher'
import { ZSchemaBrand } from '@/services/schema/brand'

import { z } from 'zod/v4'

export const ZStoreFetcherBrand = ZSchemaBrand

export const ZStoreFetcherBrandsData = z.object({
  list: ZStoreFetcherBrand.array(),
  status: ZEFetcherStatus,
})
export const ZStoreFetcherBrandsActions = z.object({
  setList: z.custom<(brands: z.infer<typeof ZStoreFetcherBrand>[]) => void>(),
  setStatus: z.custom<(status: z.infer<typeof ZEFetcherStatus>) => void>(),
})
export const ZStoreFetcherBrands = z.object({
  data: ZStoreFetcherBrandsData,
  actions: ZStoreFetcherBrandsActions,
})

//
//
//
//

export type TStoreFetcherBrand = z.infer<typeof ZStoreFetcherBrand>
export type TStoreFetcherBrandsData = z.infer<typeof ZStoreFetcherBrandsData>
export type TStoreFetcherBrandsActions = z.infer<typeof ZStoreFetcherBrandsActions>
export type TStoreFetcherBrands = z.infer<typeof ZStoreFetcherBrands>
