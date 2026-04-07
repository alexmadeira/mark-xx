import type { TFetcherPrefetch } from '@/interfaces/fetcher'

import { makePreFetcherRaw } from '_TEST/utils/factories/fetcher/make-pre-fetcher-raw'
import { PreFetcherMapperMock } from '_TEST/utils/stubs/mapper/fake-pre-fetcher-mapper'
import { FakePreFetcherStore } from '_TEST/utils/stubs/stores/fake-pre-fetcher-store'

import { PreFetcher } from '_SRV/fetcher/pre-fetcher'

let mapper: PreFetcherMapperMock
let store: FakePreFetcherStore
let sut: PreFetcher

type TBuildPrefetcherProps = {
  key?: string
  name?: string
  tags?: string[]
}

function buildPrefetcher(props: TBuildPrefetcherProps = {}) {
  const raw = makePreFetcherRaw({
    name: props.name,
    tags: props.tags,
  })

  const fetchSpy = vi.fn(async () => {
    const mapped = mapper.toStore(raw)
    const key = props.key || raw.name
    store.actions.setList(key, [mapped])
  })

  const prefetcher: TFetcherPrefetch = {
    name: raw.name,
    tags: raw.tags,
    fetch: fetchSpy,
  }

  return {
    prefetcher,
    fetchSpy,
    raw,
  }
}

describe('Services', () => {
  beforeEach(() => {
    mapper = new PreFetcherMapperMock()
    store = new FakePreFetcherStore()
    sut = new PreFetcher()
  })

  describe('Fetcher', () => {
    describe('PreFetcher', () => {
      it('should be able addPrefetcher and run pending items', async () => {
        const first = buildPrefetcher({ key: 'pre-fetcher:list' })
        const second = buildPrefetcher({ key: 'pre-fetcher:list' })

        sut.addPrefetcher([first.prefetcher, second.prefetcher])

        await vi.waitFor(() => {
          expect(first.fetchSpy).toHaveBeenCalledOnce()
          expect(second.fetchSpy).toHaveBeenCalledOnce()
        })

        expect(mapper.toStoreSpy).toHaveBeenCalledTimes(2)
        expect(store.actions.setList).toHaveBeenCalledTimes(2)
      })

      it('should fetch directly when prefetcher was not registered', async () => {
        const current = buildPrefetcher({ key: 'pre-fetcher:direct' })

        await sut.fetch(current.prefetcher)

        expect(current.fetchSpy).toHaveBeenCalledOnce()
        expect(mapper.toStoreSpy).toHaveBeenCalledOnce()
        expect(store.actions.setList).toHaveBeenCalledOnce()
      })

      it('should not fetch again when status is fetched', async () => {
        const current = buildPrefetcher({ name: 'pre-fetcher:status', tags: ['status'] })

        sut.addPrefetcher(current.prefetcher)
        await vi.waitFor(() => expect(current.fetchSpy).toHaveBeenCalledTimes(1))

        await sut.fetch(current.prefetcher)

        expect(current.fetchSpy).toHaveBeenCalledTimes(1)
      })

      it('should run background prefetchers only after runBackground', async () => {
        const current = buildPrefetcher({ name: 'pre-fetcher:background', tags: ['background'] })

        sut.addBackgroundPrefetcher(current.prefetcher)
        await Promise.resolve()

        expect(current.fetchSpy).not.toHaveBeenCalled()

        sut.runBackground()

        await vi.waitFor(() => expect(current.fetchSpy).toHaveBeenCalledOnce())
      })
    })
  })
})
