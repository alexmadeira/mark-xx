import { makePreFetcher } from '_TEST/utils/factories/fetcher/make-pre-fetcher'
import { PreFetcherMapperMock } from '_TEST/utils/stubs/mapper/fake-pre-fetcher-mapper'
import { FakePreFetcherStore } from '_TEST/utils/stubs/stores/fake-pre-fetcher-store'

import { PreFetcher } from '_SRV/fetcher/pre-fetcher'

let mapper: PreFetcherMapperMock
let store: FakePreFetcherStore
let sut: PreFetcher

describe('Services', () => {
  beforeEach(() => {
    mapper = new PreFetcherMapperMock()
    store = new FakePreFetcherStore()
    sut = new PreFetcher()
  })

  describe('Fetcher', () => {
    describe('PreFetcher', () => {
      it('should be able', async () => {
        const preFetcher = makePreFetcher({ key: 'pre-fetcher' }, { mapper, store })

        sut.addPrefetcher([preFetcher])

        await vi.waitFor(() => expect(preFetcher.fetch).toHaveBeenCalledOnce())

        expect(mapper.toStore).toHaveBeenCalledOnce()
      })
      it('should be able addPrefetcher and run pending items', async () => {
        const first = makePreFetcher({ key: 'pre-fetcher:list' }, { mapper, store })
        const second = makePreFetcher({ key: 'pre-fetcher:list' }, { mapper, store })

        sut.addPrefetcher([first, second])

        await vi.waitFor(() => {
          expect(first.fetch).toHaveBeenCalledOnce()
          expect(second.fetch).toHaveBeenCalledOnce()
        })

        expect(mapper.toStore).toHaveBeenCalledTimes(2)
        expect(store.actions.setList).toHaveBeenCalledTimes(2)
      })

      it('should fetch directly when prefetcher was not registered', async () => {
        const current = makePreFetcher({ key: 'pre-fetcher:direct' }, { mapper, store })

        sut.fetch(current)

        expect(current.fetch).toHaveBeenCalledOnce()
        expect(mapper.toStore).toHaveBeenCalledOnce()
        expect(store.actions.setList).toHaveBeenCalledOnce()
      })

      it('should not fetch again when status is fetched', async () => {
        const current = makePreFetcher({ name: 'pre-fetcher:status', tags: ['status'] }, { mapper, store })
        const addPrefetcherSpy = vi.spyOn(sut, 'addPrefetcher')

        sut.addPrefetcher(current)
        await vi.waitFor(() => expect(current.fetch).toHaveBeenCalledOnce())
        const currentCalls = addPrefetcherSpy.mock.calls.length

        sut.fetch(current)

        expect(current.fetch).toHaveBeenCalledOnce()
        expect(addPrefetcherSpy).toHaveBeenCalledTimes(currentCalls)
      })

      it('should not fetch again when the current prefetcher status is pending', async () => {
        const current = makePreFetcher({ name: 'pre-fetcher:pending', tags: ['pending'] }, { mapper, store })

        vi.spyOn(sut, 'run').mockResolvedValue(undefined)
        sut.addPrefetcher(current)

        const addPrefetcherSpy = vi.spyOn(sut, 'addPrefetcher')
        sut.fetch(current)

        expect(addPrefetcherSpy).not.toHaveBeenCalled()
        expect(current.fetch).not.toHaveBeenCalled()
      })

      it('should run background prefetchers only after runBackground', async () => {
        const current = makePreFetcher({ name: 'pre-fetcher:background', tags: ['background'] }, { mapper, store })

        sut.addBackgroundPrefetcher(current)
        await Promise.resolve()

        expect(current.fetch).not.toHaveBeenCalled()

        sut.runBackground()

        await vi.waitFor(() => expect(current.fetch).toHaveBeenCalledOnce())
      })
    })
  })
})
