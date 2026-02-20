import {
  awardsFetcher,
  brandsFetcher,
  networksFetcher,
  pageFetcher,
  preFetcher,
  projectsFetcher,
  repositoriesFetcher,
  technologiesFetcher,
} from '_SRV/fetcher'

import { env } from '~/env'

export function PreFetcher() {
  const FPage = pageFetcher()
  const FAwards = awardsFetcher()
  const FBrands = brandsFetcher()
  const FProjects = projectsFetcher()
  const FNetworks = networksFetcher()
  const FTechnologies = technologiesFetcher()
  const FRepositories = repositoriesFetcher()

  const FPreFetcher = preFetcher()

  FPreFetcher.addPrefetcher([
    FPage.prefetch('home'),
    FPage.prefetch('about'),
    FPage.prefetch('projects'),
    FAwards.prefetch('about:awards'),
    FBrands.prefetch('about:brands'),
    FNetworks.prefetch('networks'),
    FProjects.prefetch('all:projects'),
    FProjects.prefetch('home:projects', { filter: { fields: { highlight: true } } }),
    FTechnologies.prefetch('banner:technologies', { filter: { tags: ['banner'] } }),
    //
    FRepositories.prefetch('about:repositories', { params: { perPage: env.VITE_GITHUB_TOTAL_REPOSITORIES } }),
  ])

  return null
}
