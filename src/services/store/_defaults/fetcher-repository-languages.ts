import type { TStoreFetcherRepositoryLanguagesData } from '@/services/store/fetcher-repository-languages'

export const fetcherRepositoryLanguagesDefaultData = {
  list: {},
  status: 'idle',
  totalUsage: 0,
  languageUsage: [],
} satisfies TStoreFetcherRepositoryLanguagesData
