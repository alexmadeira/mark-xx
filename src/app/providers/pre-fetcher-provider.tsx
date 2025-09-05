import type { TPreFetcherProviderProps } from '@/providers/pre-fetcher'

import { loader } from '_SRV/builder/loader'
import {
  awardsFetcher,
  brandsFetcher,
  pageFetcher,
  preFetcher,
  projectFetcher,
  projectsFetcher,
  technologiesFetcher,
  usageLanguagesFetcher,
} from '_SRV/fetcher'

const dynamicProjects = [
  'petland-brasil',
  'jeep-compass',
  'toro',
  'nerd-loot',
  'sem-parar',
  'chilli-beans',
  'droga-raia',
  'jeep-renegade',
]

export function PreFetcherProvider({ children }: TPreFetcherProviderProps) {
  const BLoader = loader()

  const FPage = pageFetcher()
  const FAwards = awardsFetcher()
  const FBrands = brandsFetcher()
  const FProject = projectFetcher()
  const FProjects = projectsFetcher()
  const FTechnologies = technologiesFetcher()

  const FUsageLanguages = usageLanguagesFetcher()

  const FPreFetcher = preFetcher()

  BLoader.on('Loader:Finished', FPreFetcher.runBackground.bind(FPreFetcher))

  FPreFetcher.addPrefetcher([
    FPage.prefetch('home'),
    FPage.prefetch('about'),
    FPage.prefetch('projects'),
    FAwards.prefetch('about:awards'),
    FBrands.prefetch('about:brands'),
    FProjects.prefetch('projects'),
    FProjects.prefetch('home-projects', { filter: { highlight: true } }),
    FTechnologies.prefetch('banner'),
    FUsageLanguages.prefetch('about:usage-languages'),
  ])

  FPreFetcher.addBackgroundPrefetcher(dynamicProjects.map((slug) => FProject.prefetch(slug)))

  return children
}
