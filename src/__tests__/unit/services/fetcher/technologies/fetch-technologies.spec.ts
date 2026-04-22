import type { TFakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'

import { makeTechnologyRaw } from '_TEST/utils/factories/fetcher/make-technology-raw'
import { fakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'
import { TechnologyMapperMock } from '_TEST/utils/stubs/mapper/fake-technology-mapper'
import { FakeFetcherTechnologiesStore } from '_TEST/utils/stubs/stores/fake-fetcher-technologies-store'

import { TechnologiesFetcher } from '_SRV/fetcher/technologies-fetcher'

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
          await sut.fetch('technologies')
          expect(requesterApi.query).toHaveBeenCalledOnce()
        })
        it('should sets status to `loading` before the api call', async () => {
          const technologyFetche = sut.fetch('technologies:loading')

          expect(technologiesStore.actions.setStatus).toHaveBeenCalledWith('loading')
          expect(technologiesStore.data.status).toBe('loading')

          await technologyFetche
        })
        it('should sets status to `loaded` after success api call', async () => {
          const technologyFetche = sut.fetch('technologies:loaded')
          expect(technologiesStore.data.status).toBe('loading')
          await technologyFetche
          expect(technologiesStore.actions.setStatus).toHaveBeenCalledWith('loaded')
          expect(technologiesStore.data.status).toBe('loaded')
        })
        it('should queries the api with the correct key and type', async () => {
          await sut.fetch('technologies:key-type')
          expect(requesterApi.query).toHaveBeenCalledWith(
            'mark-xx:technologies',
            ['mark-xx:technologies', 'technologies:key-type'],
            expect.objectContaining({ type: 'technology', return: 'all' }),
          )
        })
        it('should passes filter tags through to the api query', async () => {
          await sut.fetch('technologies:filter-tags', { filter: { tags: ['highlight'] } })
          expect(requesterApi.query).toHaveBeenCalledWith(
            'mark-xx:technologies',
            expect.any(Array),
            expect.objectContaining({ tags: ['highlight'] }),
          )
        })
        it('should be able maps results through TechnologyMapper and commits to the store', async () => {
          requesterApi.query.mockResolvedValue([
            makeTechnologyRaw({
              data: {
                name: 'Technology 01',
                type: 'tech-01',
                color: '#00ffaa',
                banner: {
                  url: 'http://image.com/technology-01.jpg',
                },
              },
            }),
            makeTechnologyRaw({
              data: {
                name: 'Technology 02',
                type: 'tech-02',
                color: '#ffaa99',
              },
            }),
          ])
          await sut.fetch('technologies:mapper')

          expect(technologyMapper.toStore).toHaveBeenCalledTimes(2)
          expect(technologiesStore.actions.setList).toHaveBeenCalledOnce()

          expect(technologiesStore.data.list[0].name).toEqual('Technology 01')
          expect(technologiesStore.data.list[0].type).toEqual('tech-01')
          expect(technologiesStore.data.list[0].color).toEqual('#00ffaa')
          expect(technologiesStore.data.list[0].banner).toEqual('http://image.com/technology-01.jpg')

          expect(technologiesStore.data.list[1].name).toEqual('Technology 02')
          expect(technologiesStore.data.list[1].type).toEqual('tech-02')
          expect(technologiesStore.data.list[1].color).toEqual('#ffaa99')
          expect(technologiesStore.data.list[1].banner).toBeUndefined()
        })
        it('shouldn`t call setList or TechnologyMapper when the api rejects', async () => {
          requesterApi.query.mockRejectedValue(new Error('fail'))
          const technologyFetche = sut.fetch('technologies:error')
          await expect(technologyFetche).rejects.toThrowError()

          expect(technologyMapper.toStore).not.toHaveBeenCalled()
          expect(technologiesStore.actions.setList).not.toHaveBeenCalled()
        })
        it('should sets status to `error` and re-throws when the api rejects ', async () => {
          requesterApi.query.mockRejectedValue(new Error('network failure'))
          const technologyFetche = sut.fetch('technologies:error')
          await expect(technologyFetche).rejects.toThrow('network failure')

          expect(technologiesStore.actions.setStatus).toHaveBeenCalledWith('error')
          expect(technologiesStore.data.status).toBe('error')
        })
        it('should be able invokes the callback option on success', async () => {
          const callback = vi.fn()
          await sut.fetch('technologies:callback', { callback })

          expect(callback).toHaveBeenCalledOnce()
        })
      })
    })
  })
})
