import { imageCloudinary } from '_SRV/lib/image'

import { AwardMapper } from './award-mapper'
import { BrandMapper } from './brand-mapper'
import { CompanyMapper } from './company-mapper'
import { NetworkMapper } from './network-mapper'
import { PageMapper } from './page-mapper'
import { ProjectMapper } from './project-mapper'
import { RepositoryLanguageMapper } from './repository-language-mapper'
import { RepositoryMapper } from './repository-mapper'
import { TechnologyMapper } from './technology-mapper'

let pageMapper: PageMapper
let awardMapper: AwardMapper
let brandMapper: BrandMapper
let companyMapper: CompanyMapper
let networkMapper: NetworkMapper
let projectMapper: ProjectMapper
let technologyMapper: TechnologyMapper
let repositoryMapper: RepositoryMapper
let repositoryLanguageMapper: RepositoryLanguageMapper

export function mapperPage() {
  if (!pageMapper) pageMapper = new PageMapper()
  return pageMapper
}

export function mapperAward() {
  if (!awardMapper) awardMapper = new AwardMapper()
  return awardMapper
}
export function mapperBrand() {
  if (!brandMapper) brandMapper = new BrandMapper()
  return brandMapper
}
export function mapperCompany() {
  if (!companyMapper) companyMapper = new CompanyMapper()
  return companyMapper
}
export function mapperNetwork() {
  if (!networkMapper) networkMapper = new NetworkMapper()
  return networkMapper
}
export function mapperTechnology() {
  if (!technologyMapper) technologyMapper = new TechnologyMapper(imageCloudinary())
  return technologyMapper
}
export function mapperRepository() {
  if (!repositoryMapper) repositoryMapper = new RepositoryMapper()
  return repositoryMapper
}
export function mapperRepositoryLanguage() {
  if (!repositoryLanguageMapper) repositoryLanguageMapper = new RepositoryLanguageMapper()
  return repositoryLanguageMapper
}

export function mapperProject() {
  if (!projectMapper) projectMapper = new ProjectMapper(imageCloudinary(), mapperTechnology(), mapperCompany())
  return projectMapper
}
