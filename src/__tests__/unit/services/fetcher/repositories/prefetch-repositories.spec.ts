import type { TFakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'

import { fakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'
import { RepositoryMapperMock } from '_TEST/utils/stubs/mapper/fake-repository-mapper'
import { FakeFetcherRepositoriesStore } from '_TEST/utils/stubs/stores/fake-fetcher-repositories-store'

import { RepositoriesFetcher } from '_SRV/fetcher/repositories-fetcher'

vi.stubGlobal('window', { addEventListener: vi.fn() })

let repositoryMapper: RepositoryMapperMock
let repositoriesStore: FakeFetcherRepositoriesStore
let requesterApi: TFakeRequesterApi
let sut: RepositoriesFetcher

describe('Services', () => {
  beforeEach(() => {
    repositoriesStore = new FakeFetcherRepositoriesStore()
    repositoryMapper = new RepositoryMapperMock()
    requesterApi = fakeRequesterApi()

    requesterApi.query.mockResolvedValue([])
    sut = new RepositoriesFetcher(requesterApi, repositoryMapper, repositoriesStore)
  })
  describe('Fetcher', () => {
    describe('Repositories', () => {
      describe('Fetch', () => {
        it('should be able', async () => {
          const result = sut.prefetch('repository:prefetch')

          expect(result.tags).toEqual(['repositories'])
          expect(result.name).toBe('repository:prefetch')
          expect(result.fetch).toBeTypeOf('function')
        })
        it('should return a fetch delegates to this.fetch', async () => {
          const result = sut.prefetch('repository:delegate-fetch')

          await result.fetch()
          expect(requesterApi.query).toHaveBeenCalledOnce()
        })
      })
    })
  })
})
