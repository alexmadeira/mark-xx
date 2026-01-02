import type { TStoreFetcherCompaniesData } from '@/services/store/fetcher-companies'

export const fetcherCompaniesDefaultData = {
  list: [],
  status: 'idle',
} satisfies TStoreFetcherCompaniesData
