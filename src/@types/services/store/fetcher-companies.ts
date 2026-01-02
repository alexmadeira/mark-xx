import { ZEFetcherStatus } from '@/enums/fetcher'
import { ZSchemaCompany } from '@/services/schema/company'

import { z } from 'zod/v4'

export const ZStoreFetcherCompany = ZSchemaCompany

export const ZStoreFetcherCompaniesData = z.object({
  list: ZStoreFetcherCompany.array(),
  status: ZEFetcherStatus,
})
export const ZStoreFetcherCompaniesActions = z.object({
  setList: z.custom<(companies: z.infer<typeof ZStoreFetcherCompany>[]) => void>(),
  setStatus: z.custom<(status: z.infer<typeof ZEFetcherStatus>) => void>(),
})
export const ZStoreFetcherCompanies = z.object({
  data: ZStoreFetcherCompaniesData,
  actions: ZStoreFetcherCompaniesActions,
})

//
//
//
//

export type TStoreFetcherCompany = z.infer<typeof ZStoreFetcherCompany>
export type TStoreFetcherCompaniesData = z.infer<typeof ZStoreFetcherCompaniesData>
export type TStoreFetcherCompaniesActions = z.infer<typeof ZStoreFetcherCompaniesActions>
export type TStoreFetcherCompanies = z.infer<typeof ZStoreFetcherCompanies>
