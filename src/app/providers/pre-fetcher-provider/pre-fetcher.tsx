import { networksFetcher, pageFetcher, preFetcher, projectsFetcher, technologiesFetcher } from '_SRV/fetcher'

export function PreFetcher() {
  const FPage = pageFetcher()

  const FProjects = projectsFetcher()
  const FNetworks = networksFetcher()
  const FTechnologies = technologiesFetcher()

  const FPreFetcher = preFetcher()

  FPreFetcher.addPrefetcher([
    FPage.prefetch('home'),
    FNetworks.prefetch('networks'),
    FProjects.prefetch('home:projects', { filter: { fields: { highlight: true } } }),
    FTechnologies.prefetch('banner:technologies', { filter: { tags: ['banner'] } }),
    //
  ])

  return null
}
