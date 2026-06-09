import type { TFakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'

import { AwardsFetcher } from '_SRV/fetcher/awards-fetcher'
import { fakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'
import { AwardMapperMock } from '_TEST/utils/stubs/mapper/fake-award-mapper'
import { FakeFetcherAwardsStore } from '_TEST/utils/stubs/stores/fake-fetcher-awards-store'

let awardMapper: AwardMapperMock
let awardsStore: FakeFetcherAwardsStore
let requesterApi: TFakeRequesterApi
let sut: AwardsFetcher

vi.stubGlobal('window', { addEventListener: vi.fn() })

describe('Services', () => {
  beforeEach(() => {
    awardsStore = new FakeFetcherAwardsStore()
    awardMapper = new AwardMapperMock()
    requesterApi = fakeRequesterApi()

    requesterApi.query.mockResolvedValue([])
    sut = new AwardsFetcher(requesterApi, awardMapper, awardsStore)
  })

  describe('Fetcher', () => {
    describe('Awards', () => {
      describe('Fetch', () => {
        it('should be able', async () => {
          const result = sut.prefetch('awards:prefetch')

          expect(result.tags).toEqual(['awards'])
          expect(result.name).toBe('awards:prefetch')
          expect(result.fetch).toBeTypeOf('function')
        })
        it('should return a fetch delegates to this.fetch', async () => {
          const result = sut.prefetch('awards:delegate-fetch')

          await result.fetch()
          expect(requesterApi.query).toHaveBeenCalledOnce()
        })
      })
    })
  })
})
