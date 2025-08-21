import { veronica } from '_SRV/api'

import { AwardsFetcher } from './awards-fetcher'
import { PageFetcher } from './page-fetcher'
import { ProjectsFetcher } from './projects-fetcher'
import { TechnologiesFetcher } from './technologies-fetcher'
import { UsageLanguagesFetcher } from './usage-languages-fetcher'

let fetcherPage: PageFetcher
let fetcherAwards: AwardsFetcher
let fetcherProjects: ProjectsFetcher
let fetcherTechnologies: TechnologiesFetcher
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

export function technologiesFetcher() {
  if (fetcherTechnologies) return fetcherTechnologies

  fetcherTechnologies = TechnologiesFetcher.create(veronica())
  return fetcherTechnologies
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
