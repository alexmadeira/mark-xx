import type { IRepositoryLanguageMapper } from '@/interfaces/mapper/repository-language'
import type { TRawSchemaGithubRepositoryLanguages } from '@/services/schema/github-repository-language'
import type { TStoreFetcherRepositoryLanguage } from '@/services/store/fetcher-repository-languages'

import _ from 'lodash'

export class RepositoryLanguageMapperMock implements IRepositoryLanguageMapper {
  public readonly toStoreSpy: ReturnType<typeof vi.fn>
  public readonly assignPackagesSpy: ReturnType<typeof vi.fn>

  constructor(private readonly overrideData: Partial<TStoreFetcherRepositoryLanguage> = {}) {
    this.toStoreSpy = vi.fn(this.handleToStore.bind(this))
    this.assignPackagesSpy = vi.fn().mockReturnValue({})
  }

  private handleToStore(raw: TRawSchemaGithubRepositoryLanguages) {
    return _.map(raw, (usage, language) => ({
      id: _.toLower(language),
      name: language,
      usage,
      libs: [],
      ...this.overrideData,
    }))
  }

  public get toStore() {
    return this.toStoreSpy
  }

  public get assignPackages() {
    return this.assignPackagesSpy
  }
}
