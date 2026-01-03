import type { TStoreFetcherPagesAnyData, TStoreFetcherPagesData } from '@/services/store/fetcher-pages'

const basePageData = {
  id: '',
  slug: '',
  title: '',
  movie: '',
  color: 'transparent',
  status: 'idle',
  subTitle: '',
  description: '',
} satisfies TStoreFetcherPagesAnyData

export const fetcherPagesDefaultData = {
  home: basePageData,
  about: basePageData,
  projects: basePageData,
} satisfies TStoreFetcherPagesData
