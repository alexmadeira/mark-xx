import { prismic, veronica } from '_SRV/api'

import { AwardsFetcher } from './awards-fetcher'
import { BrandsFetcher } from './brands-fetcher'
import { CompaniesFetcher } from './companies-fetcher'
import { PageFetcher } from './page-fetcher'
import { PreFetcher } from './pre-fetcher'
import { ProjectFetcher } from './project-fetcher'
import { ProjectsFetcher } from './projects-fetcher'
import { TechnologiesFetcher } from './technologies-fetcher'
import { UsageLanguagesFetcher } from './usage-languages-fetcher'

let fetcherPre: PreFetcher
let fetcherPage: PageFetcher
let fetcherAwards: AwardsFetcher
let fetcherBrands: BrandsFetcher
let fetcherProject: ProjectFetcher
let fetcherProjects: ProjectsFetcher
let fetcherCompanies: CompaniesFetcher
let fetcherTechnologies: TechnologiesFetcher
let fetcherUsageLanguages: UsageLanguagesFetcher

export function projectsFetcher() {
  if (!fetcherProjects) fetcherProjects = new ProjectsFetcher(prismic())
  return fetcherProjects
}
export function projectFetcher() {
  if (!fetcherProject) fetcherProject = new ProjectFetcher(prismic())
  return fetcherProject
}

export function awardsFetcher() {
  if (!fetcherAwards) fetcherAwards = new AwardsFetcher(prismic())
  return fetcherAwards
}
export function brandsFetcher() {
  if (!fetcherBrands) fetcherBrands = new BrandsFetcher(prismic())
  return fetcherBrands
}
export function technologiesFetcher() {
  if (!fetcherTechnologies) fetcherTechnologies = new TechnologiesFetcher(prismic())
  return fetcherTechnologies
}

export function companiesFetcher() {
  if (!fetcherCompanies) fetcherCompanies = new CompaniesFetcher(prismic())
  return fetcherCompanies
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
