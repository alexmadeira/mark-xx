import type { TStoreFetcherPagesAnyData, TStoreFetcherPagesData } from '@/services/store/fetcher-pages'

const basePageData = {
  id: 'not-set',
  slug: 'not-set',
  title: 'Error',
  movie: '',
  status: 'idle',
  subTitle: 'Error Loading Page',
  description: '<p>There was an error loading this page. Please try again later.</p>',
  awardsTitle: 'Error Loading Awards Title',
  awardsSubtitle: 'Error Loading Awards Subtitle',
  languagesTitle: 'Error Loading Languages Subtitle',
  languagesSubtitle: 'Error Loading Languages Subtitle',
} satisfies TStoreFetcherPagesAnyData

export const fetcherPagesDefaultData = {
  home: basePageData,
  about: basePageData,
  projects: basePageData,
} satisfies TStoreFetcherPagesData
