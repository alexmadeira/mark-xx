import type { TStoreFetcherPagesData } from '@/services/store/fetcher-pages'

const basePageData = {
  id: 'not-set',
  slug: 'not-set',
  title: 'Error',
  status: 'idle',
  subTitle: 'Error Loading Page',
  description: '<p>There was an error loading this page. Please try again later.</p>',
  quote: null,
} as const

const aboutPageData = {
  ...basePageData,
  type: 'about',
  movie: '',
  awardsTitle: 'Error Loading Awards Title',
  awardsSubtitle: 'Error Loading Awards Subtitle',
  languagesTitle: 'Error Loading Languages Subtitle',
  languagesSubtitle: 'Error Loading Languages Subtitle',
  brandsTitle: 'Error Loading Brands Subtitle',
  brandsSubtitle: 'Error Loading Brands Subtitle',
} satisfies TStoreFetcherPagesData['about']

const homePageData = {
  ...basePageData,
  type: 'home',
} satisfies TStoreFetcherPagesData['home']

const projectsPageData = {
  ...basePageData,
  type: 'projects',
} satisfies TStoreFetcherPagesData['projects']

export const fetcherPagesDefaultData = {
  home: homePageData,
  about: aboutPageData,
  projects: projectsPageData,
} satisfies TStoreFetcherPagesData
