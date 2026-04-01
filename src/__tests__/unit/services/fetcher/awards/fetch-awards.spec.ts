import type { TFakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'

import { makeAwardRaw } from '_TEST/utils/factories/fetcher/make-award-raw'
import { fakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'
import { AwardMapperMock } from '_TEST/utils/stubs/mapper/fake-award-mapper'
import { FakeFetcherAwardsStore } from '_TEST/utils/stubs/stores/fake-fetcher-awards-store'

import { AwardsFetcher } from '_SRV/fetcher/awards-fetcher'

let awardMapper: AwardMapperMock
let awardsStore: FakeFetcherAwardsStore
let requesterApi: TFakeRequesterApi
let sut: AwardsFetcher

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
          await sut.fetch('awards')

          expect(requesterApi.query).toHaveBeenCalledOnce()
        })
        it('should sets status to `loading` before the api call', async () => {
          const awardFetche = sut.fetch('awards:loading')

          expect(awardsStore.actions.setStatus).toHaveBeenCalledWith('loading')
          expect(awardsStore.data.status).toBe('loading')

          await awardFetche
        })
        it('should sets status to `loaded` after success api call', async () => {
          const awardFetche = sut.fetch('awards:loaded')

          expect(awardsStore.data.status).toBe('loading')

          await awardFetche

          expect(awardsStore.actions.setStatus).toHaveBeenCalledWith('loaded')
          expect(awardsStore.data.status).toBe('loaded')
        })
        it('should queries the api with the correct key and type', async () => {
          await sut.fetch('awards:key-type')

          expect(requesterApi.query).toHaveBeenCalledWith(
            'mark-xx:awards',
            ['mark-xx:awards', 'awards:key-type'],
            expect.objectContaining({ type: 'award', return: 'all' }),
          )
        })
        it('should passes filter tags through to the api query', async () => {
          await sut.fetch('awards:filter-tags', { filter: { tags: ['highlight'] } })

          expect(requesterApi.query).toHaveBeenCalledWith(
            'mark-xx:awards',
            expect.any(Array),
            expect.objectContaining({ tags: ['highlight'] }),
          )
        })
        it('should be able maps results through AwardMapper and commits to the store', async () => {
          requesterApi.query.mockResolvedValue([
            makeAwardRaw({
              uid: 'award-01',
              data: {
                by: 'CSS Design Awards',
                name: 'Award 01',
                date: new Date('2025-01-01 10:20:20'),
                type: 'Prêmio',
                description: 'Award 01 description text',
              },
            }),
            makeAwardRaw({
              uid: 'award-02',
              data: {
                by: 'Awwwards',
                name: 'Award 02',
                date: new Date('2020-10-01 12:00:00'),
                type: 'Menção honrosa',
                description: 'Award 02 description text',
              },
            }),
          ])

          await sut.fetch('awards:mapper')

          expect(awardMapper.toStoreSpy).toHaveBeenCalledTimes(2)
          expect(awardsStore.actions.setList).toHaveBeenCalledOnce()

          expect(awardsStore.data.list[0].slug).toEqual('award-01')
          expect(awardsStore.data.list[0].by).toEqual('CSS Design Awards')
          expect(awardsStore.data.list[0].name).toEqual('Award 01')
          expect(awardsStore.data.list[0].date).toEqual(new Date('2025-01-01 10:20:20'))
          expect(awardsStore.data.list[0].type.value).toEqual('award')
          expect(awardsStore.data.list[0].description).toEqual('Award 01 description text')

          expect(awardsStore.data.list[1].slug).toEqual('award-02')
          expect(awardsStore.data.list[1].by).toEqual('Awwwards')
          expect(awardsStore.data.list[1].name).toEqual('Award 02')
          expect(awardsStore.data.list[1].date).toEqual(new Date('2020-10-01 12:00:00'))
          expect(awardsStore.data.list[1].type.value).toEqual('honorable-mention')
          expect(awardsStore.data.list[1].description).toEqual('Award 02 description text')
        })
        it('shouldn`t call setList or awardMapper when the api rejects', async () => {
          requesterApi.query.mockRejectedValue(new Error('fail'))

          const awardFetche = sut.fetch('awards:error')
          await expect(awardFetche).rejects.toThrowError()

          expect(awardMapper.toStoreSpy).not.toHaveBeenCalled()
          expect(awardsStore.actions.setList).not.toHaveBeenCalled()
        })
        it('should sets status to `error` and re-throws when the api rejects ', async () => {
          requesterApi.query.mockRejectedValue(new Error('network failure'))

          const awardFetche = sut.fetch('awards:error')

          await expect(awardFetche).rejects.toThrow('network failure')
          expect(awardsStore.actions.setStatus).toHaveBeenCalledWith('error')
          expect(awardsStore.data.status).toBe('error')
        })
        it('should be able invokes the callback option on success', async () => {
          const callback = vi.fn()
          await sut.fetch('awards:callback', { callback })

          expect(callback).toHaveBeenCalledOnce()
        })
      })
    })
  })
})
