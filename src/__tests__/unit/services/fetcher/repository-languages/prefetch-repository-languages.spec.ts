import type { TFakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'

import { fakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'
import { RepositoryLanguageMapperMock } from '_TEST/utils/stubs/mapper/fake-repository-language-mapper'
import { FakeFetcherRepositoryLanguagesStore } from '_TEST/utils/stubs/stores/fake-fetcher-repository-languages-store'

import { RepositoryLanguagesFetcher } from '_SRV/fetcher/repository-languages-fetcher'

vi.stubGlobal('window', { addEventListener: vi.fn() })

let repositoryLanguageMapper: RepositoryLanguageMapperMock
let repositoryLanguagesStore: FakeFetcherRepositoryLanguagesStore
let requesterApi: TFakeRequesterApi
let sut: RepositoryLanguagesFetcher

describe('Services', () => {
  beforeEach(() => {
    repositoryLanguagesStore = new FakeFetcherRepositoryLanguagesStore()
    repositoryLanguageMapper = new RepositoryLanguageMapperMock()
    requesterApi = fakeRequesterApi()

    requesterApi.query.mockResolvedValue({})
    sut = new RepositoryLanguagesFetcher(requesterApi, repositoryLanguageMapper, repositoryLanguagesStore)
  })

  describe('Fetcher', () => {
    describe('Repositories', () => {
      describe('Fetch', () => {
        it('should be able', async () => {
          const result = sut.prefetch('repository-languages:prefetch', {
            params: { owner: 'owner', name: 'repository' },
          })

          expect(result.tags).toEqual(['languages'])
          expect(result.name).toBe('repository-languages:prefetch')
          expect(result.fetch).toBeTypeOf('function')
        })
        it('should return a fetch delegates to this.fetch', async () => {
          const result = sut.prefetch('repository:delegate-fetch', { params: { owner: 'owner', name: 'repository' } })

          await result.fetch()
          expect(requesterApi.query).toHaveBeenCalledTimes(2)
        })
      })
    })
  })
})
