import { veronica } from '_SRV/api'

import { AwardsFetcher } from './awards-fetcher'
import { PageFetcher } from './page-fetcher'
import { ProjectsFetcher } from './projects-fetcher'
import { UsageLanguagesFetcher } from './usage-languages-fetcher'

let fetcherProjects: ProjectsFetcher
let fetcherAwards: AwardsFetcher
let fetcherPage: PageFetcher
let fetcherUsageLanguages: UsageLanguagesFetcher

export function projectsFetcher() {
  if (fetcherProjects) return fetcherProjects

  fetcherProjects = ProjectsFetcher.create(veronica())
  return fetcherProjects
}
export function awardsFetcher() {
  if (fetcherAwards) return fetcherAwards

  fetcherAwards = AwardsFetcher.create(veronica())
  return fetcherAwards
}
export function pageFetcher() {
  if (fetcherPage) return fetcherPage

  fetcherPage = PageFetcher.create(veronica())
  return fetcherPage
}

export function usageLanguagesFetcher() {
  if (fetcherUsageLanguages) return fetcherUsageLanguages

  fetcherUsageLanguages = UsageLanguagesFetcher.create(veronica())
  return fetcherUsageLanguages
}
