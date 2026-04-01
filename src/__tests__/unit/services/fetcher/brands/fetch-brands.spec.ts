import type { TFakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'

import { makeBrandRaw } from '_TEST/utils/factories/fetcher/make-brand-raw'
import { fakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'
import { BrandMapperMock } from '_TEST/utils/stubs/mapper/fake-brand-mapper'
import { FakeFetcherBrandsStore } from '_TEST/utils/stubs/stores/fake-fetcher-brands-store'

import { BrandsFetcher } from '_SRV/fetcher/brands-fetcher'

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
          await sut.fetch('brands')
          expect(requesterApi.query).toHaveBeenCalledOnce()
        })
        it('should sets status to `loading` before the api call', async () => {
          const brandFetche = sut.fetch('brands:loading')

          expect(brandsStore.actions.setStatus).toHaveBeenCalledWith('loading')
          expect(brandsStore.data.status).toBe('loading')

          await brandFetche
        })
        it('should sets status to `loaded` after success api call', async () => {
          const brandFetche = sut.fetch('brands:loaded')
          expect(brandsStore.data.status).toBe('loading')
          await brandFetche
          expect(brandsStore.actions.setStatus).toHaveBeenCalledWith('loaded')
          expect(brandsStore.data.status).toBe('loaded')
        })
        it('should queries the api with the correct key and type', async () => {
          await sut.fetch('brands:key-type')
          expect(requesterApi.query).toHaveBeenCalledWith(
            'mark-xx:brands',
            ['mark-xx:brands', 'brands:key-type'],
            expect.objectContaining({ type: 'brand', return: 'all' }),
          )
        })
        it('should passes filter tags through to the api query', async () => {
          await sut.fetch('brands:filter-tags', { filter: { tags: ['highlight'] } })
          expect(requesterApi.query).toHaveBeenCalledWith(
            'mark-xx:brands',
            expect.any(Array),
            expect.objectContaining({ tags: ['highlight'] }),
          )
        })
        it('should be able maps results through BrandMapper and commits to the store', async () => {
          requesterApi.query.mockResolvedValue([
            makeBrandRaw({
              uid: 'brand-01',
              data: {
                name: 'Brand 01',
                logo: 'http://image.com/brand-01.jpg',
              },
            }),
            makeBrandRaw({
              uid: 'brand-02',
              data: {
                name: 'Brand 02',
                logo: 'http://image.com/brand-02.jpg',
              },
            }),
          ])
          await sut.fetch('brands:mapper')
          expect(brandMapper.toStoreSpy).toHaveBeenCalledTimes(2)
          expect(brandsStore.actions.setList).toHaveBeenCalledOnce()

          expect(brandsStore.data.list[0].slug).toEqual('brand-01')
          expect(brandsStore.data.list[0].name).toEqual('Brand 01')
          expect(brandsStore.data.list[0].logo).toEqual('http://image.com/brand-01.jpg')

          expect(brandsStore.data.list[1].slug).toEqual('brand-02')
          expect(brandsStore.data.list[1].name).toEqual('Brand 02')
          expect(brandsStore.data.list[1].logo).toEqual('http://image.com/brand-02.jpg')
        })
        it('shouldn`t call setList or brandMapper when the api rejects', async () => {
          requesterApi.query.mockRejectedValue(new Error('fail'))
          const brandFetche = sut.fetch('brands:error')
          await expect(brandFetche).rejects.toThrowError()
          expect(brandMapper.toStoreSpy).not.toHaveBeenCalled()
          expect(brandsStore.actions.setList).not.toHaveBeenCalled()
        })
        it('should sets status to `error` and re-throws when the api rejects ', async () => {
          requesterApi.query.mockRejectedValue(new Error('network failure'))
          const brandFetche = sut.fetch('brands:error')
          await expect(brandFetche).rejects.toThrow('network failure')
          expect(brandsStore.actions.setStatus).toHaveBeenCalledWith('error')
          expect(brandsStore.data.status).toBe('error')
        })
        it('should be able invokes the callback option on success', async () => {
          const callback = vi.fn()
          await sut.fetch('brands:callback', { callback })
          expect(callback).toHaveBeenCalledOnce()
        })
      })
    })
  })
})
