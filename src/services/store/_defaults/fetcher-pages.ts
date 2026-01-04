import type { TStoreFetcherPagesAnyData, TStoreFetcherPagesData } from '@/services/store/fetcher-pages'

const basePageData = {
  id: 'not-set',
  slug: 'not-set',
  title: 'Error',
  movie: '',
  subTitle: 'Error Loading Page',
  description: '<p>There was an error loading this page. Please try again later.</p>',
  status: 'idle',
} satisfies TStoreFetcherPagesAnyData

export const fetcherPagesDefaultData = {
  home: basePageData,
  about: basePageData,
  projects: basePageData,
} satisfies TStoreFetcherPagesData
