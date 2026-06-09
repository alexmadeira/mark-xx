import type { TFakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'

import { PageFetcher } from '_SRV/fetcher/page-fetcher'
import { makePageRaw } from '_TEST/utils/factories/fetcher/make-page-raw'
import { fakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'
import { PageMapperMock } from '_TEST/utils/stubs/mapper/fake-page-mapper'
import { FakeFetcherPagesStore } from '_TEST/utils/stubs/stores/fake-fetcher-pages-store'
import { FakePageConfigsStore } from '_TEST/utils/stubs/stores/fake-page-configs-store'

vi.stubGlobal('window', { addEventListener: vi.fn() })

let pageMapper: PageMapperMock
let fetcherPagesStore: FakeFetcherPagesStore
let pageConfigsStore: FakePageConfigsStore
let requesterApi: TFakeRequesterApi
let sut: PageFetcher

describe('Services', () => {
  beforeEach(() => {
    fetcherPagesStore = new FakeFetcherPagesStore()
    pageConfigsStore = new FakePageConfigsStore()
    pageMapper = new PageMapperMock()
    requesterApi = fakeRequesterApi()

    requesterApi.query.mockResolvedValue(makePageRaw())
    sut = new PageFetcher(requesterApi, pageMapper, fetcherPagesStore, pageConfigsStore)
  })

  describe('Fetcher', () => {
    describe('Repositories', () => {
      describe('Fetch', () => {
        it('should be able', async () => {
          const result = sut.prefetch('home')

          expect(result.tags).toEqual(['page'])
          expect(result.name).toBe('home')
          expect(result.fetch).toBeTypeOf('function')
        })
        it('should return a fetch delegates to this.fetch', async () => {
          const result = sut.prefetch('projects')

          await result.fetch()
          expect(requesterApi.query).toHaveBeenCalledOnce()
        })
      })
    })
  })
})
