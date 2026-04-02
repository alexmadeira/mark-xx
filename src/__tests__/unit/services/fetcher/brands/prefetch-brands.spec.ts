import type { TFakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'

import { fakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'
import { BrandMapperMock } from '_TEST/utils/stubs/mapper/fake-brand-mapper'
import { FakeFetcherBrandsStore } from '_TEST/utils/stubs/stores/fake-fetcher-brands-store'

import { BrandsFetcher } from '_SRV/fetcher/brands-fetcher'

vi.stubGlobal('window', { addEventListener: vi.fn() })

let brandMapper: BrandMapperMock
let brandsStore: FakeFetcherBrandsStore
let requesterApi: TFakeRequesterApi
let sut: BrandsFetcher

describe('Services', () => {
  beforeEach(() => {
    brandsStore = new FakeFetcherBrandsStore()
    brandMapper = new BrandMapperMock()
    requesterApi = fakeRequesterApi()

    requesterApi.query.mockResolvedValue([])
    sut = new BrandsFetcher(requesterApi, brandMapper, brandsStore)
  })
  describe('Fetcher', () => {
    describe('Brands', () => {
      describe('Fetch', () => {
        it('should be able', async () => {
          const result = sut.prefetch('brand:prefetch')

          expect(result.tags).toEqual(['brands'])
          expect(result.name).toBe('brand:prefetch')
          expect(result.fetch).toBeTypeOf('function')
        })
        it('should return a fetch delegates to this.fetch', async () => {
          const result = sut.prefetch('brand:delegate-fetch')

          await result.fetch()
          expect(requesterApi.query).toHaveBeenCalledOnce()
        })
      })
    })
  })
})
