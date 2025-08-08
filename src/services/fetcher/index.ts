import { veronica } from '_SRV/api'

import { ProjectsFetcher } from './projects-fetcher'

let fetcherProjects: ProjectsFetcher

export function projectsFetcher() {
  if (fetcherProjects) return fetcherProjects

  fetcherProjects = ProjectsFetcher.create(veronica())

  return fetcherProjects
}
