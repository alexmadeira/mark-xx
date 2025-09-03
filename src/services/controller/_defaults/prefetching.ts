import type { TPrefetchingProps } from '@/services/controller/prefetching'

import {
  awardsFetcher,
  brandsFetcher,
  pageFetcher,
  projectsFetcher,
  technologiesFetcher,
  usageLanguagesFetcher,
} from '_SRV/fetcher'

const FPage = pageFetcher()
const FAwards = awardsFetcher()
const FBrands = brandsFetcher()
const FProjects = projectsFetcher()
const FTechnologies = technologiesFetcher()
const FUsageLanguages = usageLanguagesFetcher()

export const defaultPrefetchingProps = {
  prefetchers: [
    FPage.prefetch('home'),
    FPage.prefetch('about'),
    FPage.prefetch('projects'),
    FAwards.prefetch('about:awards'),
    FBrands.prefetch('about:brands'),
    FProjects.prefetch('projects'),
    FProjects.prefetch('home-projects', { filter: { highlight: true } }),
    FTechnologies.prefetch('banner'),
    FUsageLanguages.prefetch('about:usage-languages'),
  ],
} satisfies TPrefetchingProps
