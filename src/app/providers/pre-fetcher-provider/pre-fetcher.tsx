import {
  awardsFetcher,
  brandsFetcher,
  pageFetcher,
  preFetcher,
  projectsFetcher,
  repositoriesFetcher,
  technologiesFetcher,
} from '_SRV/fetcher'

export function PreFetcher() {
  const FPage = pageFetcher()
  const FAwards = awardsFetcher()
  const FBrands = brandsFetcher()
  const FProjects = projectsFetcher()
  const FTechnologies = technologiesFetcher()
  const FRepositories = repositoriesFetcher()

  // const FUsageLanguages = usageLanguagesFetcher()

  const FPreFetcher = preFetcher()

  FPreFetcher.addPrefetcher([
    FPage.prefetch('home'),
    FPage.prefetch('about'),
    FPage.prefetch('projects'),
    FAwards.prefetch('about:awards'),
    FBrands.prefetch('about:brands'),
    FProjects.prefetch('all:projects'),
    FProjects.prefetch('home:projects', { filter: { fields: { highlight: true } } }),
    FTechnologies.prefetch('banner:technologies', { filter: { tags: ['banner'] } }),
    //
    FRepositories.prefetch('about:repositories', { params: { perPage: 20 } }),
  ])

  return null
}
