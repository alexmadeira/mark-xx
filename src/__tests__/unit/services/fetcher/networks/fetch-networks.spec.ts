import type { TFakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'

import { makeNetworkRaw } from '_TEST/utils/factories/fetcher/make-network-raw'
import { fakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'
import { NetworkMapperMock } from '_TEST/utils/stubs/mapper/fake-network-mapper'
import { FakeFetcherNetworksStore } from '_TEST/utils/stubs/stores/fake-fetcher-networks-store'

import { NetworksFetcher } from '_SRV/fetcher/networks-fetcher'

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
          await sut.fetch('networks')
          expect(requesterApi.query).toHaveBeenCalledOnce()
        })
        it('should sets status to `loading` before the api call', async () => {
          const networkFetche = sut.fetch('networks:loading')

          expect(networksStore.actions.setStatus).toHaveBeenCalledWith('loading')
          expect(networksStore.data.status).toBe('loading')

          await networkFetche
        })
        it('should sets status to `loaded` after success api call', async () => {
          const networkFetche = sut.fetch('networks:loaded')
          expect(networksStore.data.status).toBe('loading')
          await networkFetche
          expect(networksStore.actions.setStatus).toHaveBeenCalledWith('loaded')
          expect(networksStore.data.status).toBe('loaded')
        })
        it('should queries the api with the correct key and type', async () => {
          await sut.fetch('networks:key-type')
          expect(requesterApi.query).toHaveBeenCalledWith(
            'mark-xx:networks',
            ['mark-xx:networks', 'networks:key-type'],
            expect.objectContaining({ type: 'social_network', return: 'all' }),
          )
        })
        it('should passes filter tags through to the api query', async () => {
          await sut.fetch('networks:filter-tags', { filter: { tags: ['footer'] } })
          expect(requesterApi.query).toHaveBeenCalledWith(
            'mark-xx:networks',
            expect.any(Array),
            expect.objectContaining({ tags: ['footer'] }),
          )
        })
        it('should be able maps results through NetworkMapper and commits to the store', async () => {
          requesterApi.query.mockResolvedValue([
            makeNetworkRaw({
              tags: ['social'],
              data: {
                network_name: 'LinkedIn',
                network_path: 'https://linkedin.com/in/user',
                network_type: 'link',
                network_icon: 'linkedin',
              },
            }),
            makeNetworkRaw({
              tags: ['footer'],
              data: {
                network_name: 'tony.stark@email.com',
                network_path: 'tony.stark@email.com',
                network_type: 'copy',
                network_icon: 'email',
              },
            }),
          ])
          await sut.fetch('networks:mapper')
          expect(networkMapper.toStore).toHaveBeenCalledTimes(2)
          expect(networksStore.actions.setList).toHaveBeenCalledOnce()

          expect(networksStore.data.list[0].tags).toEqual(['social'])
          expect(networksStore.data.list[0].name).toEqual('LinkedIn')
          expect(networksStore.data.list[0].path).toEqual('https://linkedin.com/in/user')
          expect(networksStore.data.list[0].type).toEqual('link')
          expect(networksStore.data.list[0].icon).toEqual('linkedin')

          expect(networksStore.data.list[1].tags).toEqual(['footer'])
          expect(networksStore.data.list[1].name).toEqual('tony.stark@email.com')
          expect(networksStore.data.list[1].path).toEqual('tony.stark@email.com')
          expect(networksStore.data.list[1].type).toEqual('copy')
          expect(networksStore.data.list[1].icon).toEqual('email')
        })
        it('shouldn`t call setList or NetworkMapper when the api rejects', async () => {
          requesterApi.query.mockRejectedValue(new Error('fail'))
          const networkFetche = sut.fetch('networks:error')
          await expect(networkFetche).rejects.toThrowError()

          expect(networkMapper.toStore).not.toHaveBeenCalled()
          expect(networksStore.actions.setList).not.toHaveBeenCalled()
        })
        it('should sets status to `error` and re-throws when the api rejects ', async () => {
          requesterApi.query.mockRejectedValue(new Error('network failure'))
          const networkFetche = sut.fetch('networks:error')
          await expect(networkFetche).rejects.toThrow('network failure')

          expect(networksStore.actions.setStatus).toHaveBeenCalledWith('error')
          expect(networksStore.data.status).toBe('error')
        })
        it('should be able invokes the callback option on success', async () => {
          const callback = vi.fn()
          await sut.fetch('networks:callback', { callback })

          expect(callback).toHaveBeenCalledOnce()
        })
      })
    })
  })
})
