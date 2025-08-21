import type { TStoreFetcherUsageLanguagesData } from '@/services/store/fetcher-usage-languages'

export const fetcherUsageLanguagesDefaultData = {
  list: [],
  total: 0,
  status: 'idle',
} satisfies TStoreFetcherUsageLanguagesData
