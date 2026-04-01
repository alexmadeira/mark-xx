import { github, prismic } from '_SRV/api'
import { AwardMapper } from '_SRV/mapper/award-mapper'
import { BrandMapper } from '_SRV/mapper/brand-mapper'
import { CompanyMapper } from '_SRV/mapper/company-mapper'
import { NetworkMapper } from '_SRV/mapper/network-mapper'

import { useFetcherAwards } from '_STR/useFetcherAwards'
import { useFetcherBrands } from '_STR/useFetcherBrands'
import { useFetcherCompanies } from '_STR/useFetcherCompanies'
import { useFetcherNetworks } from '_STR/useFetcherNetworks'

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

const awardMapper = new AwardMapper()
const brandMapper = new BrandMapper()
const companyMapper = new CompanyMapper()
const networkMapper = new NetworkMapper()

export function preFetcher() {
  if (!fetcherPre) fetcherPre = new PreFetcher()
  return fetcherPre
}

export function projectsFetcher() {
  if (!fetcherProjects) fetcherProjects = new ProjectsFetcher(prismic())
  return fetcherProjects
}
export function projectFetcher() {
  if (!fetcherProject) fetcherProject = new ProjectFetcher(prismic())
  return fetcherProject
}
export function awardsFetcher() {
  if (!fetcherAwards) fetcherAwards = new AwardsFetcher(prismic(), awardMapper, useFetcherAwards.getState())
  return fetcherAwards
}
export function networksFetcher() {
  if (!fetcherNetworks) fetcherNetworks = new NetworksFetcher(prismic(), networkMapper, useFetcherNetworks.getState())
  return fetcherNetworks
}
export function brandsFetcher() {
  if (!fetcherBrands) fetcherBrands = new BrandsFetcher(prismic(), brandMapper, useFetcherBrands.getState())
  return fetcherBrands
}
export function technologiesFetcher() {
  if (!fetcherTechnologies) fetcherTechnologies = new TechnologiesFetcher(prismic())
  return fetcherTechnologies
}

export function companiesFetcher() {
  if (!fetcherCompanies) {
    fetcherCompanies = new CompaniesFetcher(prismic(), companyMapper, useFetcherCompanies.getState())
  }
  return fetcherCompanies
}
export function pageFetcher() {
  if (!fetcherPage) fetcherPage = new PageFetcher(prismic())
  return fetcherPage
}

export function repositoriesFetcher() {
  if (!fetcherRepositories) fetcherRepositories = new RepositoriesFetcher(github())
  return fetcherRepositories
}
export function repositoryLanguagesFetcher() {
  if (!fetcherRepositoryLanguages) fetcherRepositoryLanguages = new RepositoryLanguagesFetcher(github())
  return fetcherRepositoryLanguages
}
