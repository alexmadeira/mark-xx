import { prismic, veronica } from '_SRV/api'

import { AwardsFetcher } from './awards-fetcher'
import { BrandsFetcher } from './brands-fetcher'
import { PageFetcher } from './page-fetcher'
import { PreFetcher } from './pre-fetcher'
import { ProjectFetcher } from './project-fetcher'
import { ProjectsFetcher } from './projects-fetcher'
import { TechnologiesFetcher } from './technologies-fetcher'
import { UsageLanguagesFetcher } from './usage-languages-fetcher'

let fetcherPre: PreFetcher
let fetcherPage: PageFetcher
let fetcherProject: ProjectFetcher
let fetcherAwards: AwardsFetcher
let fetcherBrands: BrandsFetcher
let fetcherProjects: ProjectsFetcher
let fetcherTechnologies: TechnologiesFetcher
let fetcherUsageLanguages: UsageLanguagesFetcher

export function projectsFetcher() {
  if (!fetcherProjects) fetcherProjects = new ProjectsFetcher(veronica())
  return fetcherProjects
}
export function projectFetcher() {
  if (!fetcherProject) fetcherProject = new ProjectFetcher(veronica())
  return fetcherProject
}

export function awardsFetcher() {
  if (!fetcherAwards) fetcherAwards = new AwardsFetcher(veronica())
  return fetcherAwards
}
export function brandsFetcher() {
  if (!fetcherBrands) fetcherBrands = new BrandsFetcher(veronica())
  return fetcherBrands
}
export function technologiesFetcher() {
  if (!fetcherTechnologies) fetcherTechnologies = new TechnologiesFetcher(prismic())
  return fetcherTechnologies
}
export function pageFetcher() {
  if (!fetcherPage) fetcherPage = new PageFetcher(prismic())
  return fetcherPage
}

export function usageLanguagesFetcher() {
  if (!fetcherUsageLanguages) fetcherUsageLanguages = new UsageLanguagesFetcher(veronica())
  return fetcherUsageLanguages
}

export function preFetcher() {
  if (!fetcherPre) fetcherPre = new PreFetcher()
  return fetcherPre
}
