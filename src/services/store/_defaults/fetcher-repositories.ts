import type { TStoreFetcherRepositoriesData } from '@/services/store/fetcher-repositories'

export const fetcherRepositoriesDefaultData = {
  status: 'idle',
  list: [],
} satisfies TStoreFetcherRepositoriesData
