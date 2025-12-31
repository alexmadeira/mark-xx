import {
  // awardsFetcher,
  // brandsFetcher,
  pageFetcher,
  preFetcher,
  // projectsFetcher,
  // technologiesFetcher,
  // usageLanguagesFetcher,
} from '_SRV/fetcher'

export function PreFetcher() {
  const FPage = pageFetcher()
  // const FAwards = awardsFetcher()
  // const FBrands = brandsFetcher()
  // const FProjects = projectsFetcher()
  // const FTechnologies = technologiesFetcher()

  // const FUsageLanguages = usageLanguagesFetcher()

  const FPreFetcher = preFetcher()

  FPreFetcher.addPrefetcher([
    FPage.prefetch('home'),
    FPage.prefetch('about'),
    FPage.prefetch('projects'),
    // FAwards.prefetch('about:awards'),
    // FBrands.prefetch('about:brands'),
    // FProjects.prefetch('projects'),
    // FProjects.prefetch('home-projects', { filter: { highlight: true } }),
    // FTechnologies.prefetch('banner'),
    // FUsageLanguages.prefetch('about:usage-languages'),
  ])

  return null
}
