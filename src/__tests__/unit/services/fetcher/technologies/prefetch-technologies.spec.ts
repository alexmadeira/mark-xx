import type { TFakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'

import { TechnologiesFetcher } from '_SRV/fetcher/technologies-fetcher'
import { fakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'
import { TechnologyMapperMock } from '_TEST/utils/stubs/mapper/fake-technology-mapper'
import { FakeFetcherTechnologiesStore } from '_TEST/utils/stubs/stores/fake-fetcher-technologies-store'

vi.stubGlobal('window', { addEventListener: vi.fn() })

let technologyMapper: TechnologyMapperMock
let technologiesStore: FakeFetcherTechnologiesStore
let requesterApi: TFakeRequesterApi
let sut: TechnologiesFetcher

describe('Services', () => {
  beforeEach(() => {
    technologiesStore = new FakeFetcherTechnologiesStore()
    technologyMapper = new TechnologyMapperMock()
    requesterApi = fakeRequesterApi()

    requesterApi.query.mockResolvedValue([])
    sut = new TechnologiesFetcher(requesterApi, technologyMapper, technologiesStore)
  })

  describe('Fetcher', () => {
    describe('Technologies', () => {
      describe('Fetch', () => {
        it('should be able', async () => {
          const result = sut.prefetch('technology:prefetch')

          expect(result.tags).toEqual(['technologies'])
          expect(result.name).toBe('technology:prefetch')
          expect(result.fetch).toBeTypeOf('function')
        })
        it('should return a fetch delegates to this.fetch', async () => {
          const result = sut.prefetch('technology:delegate-fetch')

          await result.fetch()
          expect(requesterApi.query).toHaveBeenCalledOnce()
        })
      })
    })
  })
})
