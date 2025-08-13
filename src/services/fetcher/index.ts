import { veronica } from '_SRV/api'

import { PageFetcher } from './page-fetcher'
import { ProjectsFetcher } from './projects-fetcher'

let fetcherProjects: ProjectsFetcher
let fetcherPage: PageFetcher

export function projectsFetcher() {
  if (fetcherProjects) return fetcherProjects

  fetcherProjects = ProjectsFetcher.create(veronica())
  return fetcherProjects
}
export function pageFetcher() {
  if (fetcherPage) return fetcherPage

  fetcherPage = PageFetcher.create(veronica())
  return fetcherPage
}
