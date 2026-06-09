import { github, prismic } from '_SRV/api'
import {
  mapperAward,
  mapperBrand,
  mapperCompany,
  mapperNetwork,
  mapperPage,
  mapperProject,
  mapperRepository,
  mapperRepositoryLanguage,
  mapperTechnology,
} from '_SRV/mapper'
import { useFetcherAwards } from '_STR/useFetcherAwards'
import { useFetcherBrands } from '_STR/useFetcherBrands'
import { useFetcherCompanies } from '_STR/useFetcherCompanies'
import { useFetcherNetworks } from '_STR/useFetcherNetworks'
import { useFetcherPages } from '_STR/useFetcherPages'
import { useFetcherProjects } from '_STR/useFetcherProjects'
import { useFetcherRepositories } from '_STR/useFetcherRepositories'
import { useFetcherRepositoryLanguages } from '_STR/useFetcherRepositoryLanguages'
import { useFetcherTechnologies } from '_STR/useFetcherTechnologies'
import { usePageConfigs } from '_STR/usePageConfigs'

import { AwardsFetcher } from './awards-fetcher'
import { BrandsFetcher } from './brands-fetcher'
import { CompaniesFetcher } from './companies-fetcher'
import { NetworksFetcher } from './networks-fetcher'
import { PageFetcher } from './page-fetcher'
import { PreFetcher } from './pre-fetcher'
import { ProjectFetcher } from './project-fetcher'
import { ProjectsFetcher } from './projects-fetcher'
import { RepositoriesFetcher } from './repositories-fetcher'
import { RepositoryLanguagesFetcher } from './repository-languages-fetcher'
import { TechnologiesFetcher } from './technologies-fetcher'

let fetcherPre: PreFetcher
let fetcherPage: PageFetcher
let fetcherAwards: AwardsFetcher
let fetcherBrands: BrandsFetcher
let fetcherProject: ProjectFetcher
let fetcherProjects: ProjectsFetcher
let fetcherNetworks: NetworksFetcher
let fetcherCompanies: CompaniesFetcher
let fetcherTechnologies: TechnologiesFetcher
let fetcherRepositories: RepositoriesFetcher
let fetcherRepositoryLanguages: RepositoryLanguagesFetcher

export function preFetcher() {
  if (!fetcherPre) fetcherPre = new PreFetcher()
  return fetcherPre
}

export function projectsFetcher() {
  if (!fetcherProjects) {
    fetcherProjects = new ProjectsFetcher(prismic(), mapperProject(), useFetcherProjects.getState())
  }
  return fetcherProjects
}

export function awardsFetcher() {
  if (!fetcherAwards) {
    fetcherAwards = new AwardsFetcher(prismic(), mapperAward(), useFetcherAwards.getState())
  }
  return fetcherAwards
}
export function networksFetcher() {
  if (!fetcherNetworks) {
    fetcherNetworks = new NetworksFetcher(prismic(), mapperNetwork(), useFetcherNetworks.getState())
  }
  return fetcherNetworks
}
export function brandsFetcher() {
  if (!fetcherBrands) {
    fetcherBrands = new BrandsFetcher(prismic(), mapperBrand(), useFetcherBrands.getState())
  }
  return fetcherBrands
}
export function technologiesFetcher() {
  if (!fetcherTechnologies) {
    fetcherTechnologies = new TechnologiesFetcher(prismic(), mapperTechnology(), useFetcherTechnologies.getState())
  }
  return fetcherTechnologies
}

export function companiesFetcher() {
  if (!fetcherCompanies) {
    fetcherCompanies = new CompaniesFetcher(prismic(), mapperCompany(), useFetcherCompanies.getState())
  }
  return fetcherCompanies
}
export function pageFetcher() {
  if (!fetcherPage) {
    fetcherPage = new PageFetcher(prismic(), mapperPage(), useFetcherPages.getState(), usePageConfigs.getState())
  }
  return fetcherPage
}

export function projectFetcher() {
  if (!fetcherProject) {
    fetcherProject = new ProjectFetcher(
      prismic(),
      mapperProject(),
      mapperPage(),
      useFetcherProjects.getState(),
      usePageConfigs.getState(),
    )
  }
  return fetcherProject
}
export function repositoriesFetcher() {
  if (!fetcherRepositories) {
    fetcherRepositories = new RepositoriesFetcher(github(), mapperRepository(), useFetcherRepositories.getState())
  }
  return fetcherRepositories
}
export function repositoryLanguagesFetcher() {
  if (!fetcherRepositoryLanguages) {
    fetcherRepositoryLanguages = new RepositoryLanguagesFetcher(
      github(),
      mapperRepositoryLanguage(),
      useFetcherRepositoryLanguages.getState(),
    )
  }
  return fetcherRepositoryLanguages
}
