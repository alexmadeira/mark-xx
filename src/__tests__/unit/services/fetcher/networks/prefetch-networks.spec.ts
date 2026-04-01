import type { TFakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'

import { fakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'
import { NetworkMapperMock } from '_TEST/utils/stubs/mapper/fake-network-mapper'
import { FakeFetcherNetworksStore } from '_TEST/utils/stubs/stores/fake-fetcher-networks-store'

import { NetworksFetcher } from '_SRV/fetcher/networks-fetcher'

vi.stubGlobal('window', { addEventListener: vi.fn() })

let networkMapper: NetworkMapperMock
let networksStore: FakeFetcherNetworksStore
let requesterApi: TFakeRequesterApi
let sut: NetworksFetcher

describe('Services', () => {
  beforeEach(() => {
    networksStore = new FakeFetcherNetworksStore()
    networkMapper = new NetworkMapperMock()
    requesterApi = fakeRequesterApi()

    requesterApi.query.mockResolvedValue([])
    sut = new NetworksFetcher(requesterApi, networkMapper, networksStore)
  })

  describe('Fetcher', () => {
    describe('Networks', () => {
      describe('Fetch', () => {
        it('should be able', async () => {
          const result = sut.prefetch('network:prefetch')

          expect(result.tags).toEqual(['networks'])
          expect(result.name).toBe('network:prefetch')
          expect(result.fetch).toBeTypeOf('function')
        })
        it('should return a fetch delegates to this.fetch', async () => {
          const result = sut.prefetch('network:delegate-fetch')

          await result.fetch()
          expect(requesterApi.query).toHaveBeenCalledOnce()
        })
      })
    })
  })
})
