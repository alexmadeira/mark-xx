import type { TFakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'

import { PageFetcher } from '_SRV/fetcher/page-fetcher'
import { makePageRaw } from '_TEST/utils/factories/fetcher/make-page-raw'
import { fakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'
import { PageMapperMock } from '_TEST/utils/stubs/mapper/fake-page-mapper'
import { FakeFetcherPagesStore } from '_TEST/utils/stubs/stores/fake-fetcher-pages-store'
import { FakePageConfigsStore } from '_TEST/utils/stubs/stores/fake-page-configs-store'

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
    describe('Pages', () => {
      describe('Fetch', () => {
        it('should be able', async () => {
          await sut.fetch('home')
          expect(requesterApi.query).toHaveBeenCalledOnce()
        })

        it('should sets status to `loading` before the api call', async () => {
          const pageFetch = sut.fetch('about')

          expect(fetcherPagesStore.actions.setPageStatus).toHaveBeenCalledWith('about', 'loading')
          expect(fetcherPagesStore.data.about.status).toBe('loading')

          await pageFetch
        })

        it('should sets status to `loaded` after success api call', async () => {
          const pageFetch = sut.fetch('home')
          expect(fetcherPagesStore.data.home.status).toBe('loading')

          await pageFetch

          expect(fetcherPagesStore.actions.setPageStatus).toHaveBeenCalledWith('home', 'loaded')
          expect(fetcherPagesStore.data.home.status).toBe('loaded')
        })

        it('should queries the api with the correct key and type', async () => {
          await sut.fetch('projects')

          expect(requesterApi.query).toHaveBeenCalledWith(
            'mark-xx:page',
            ['mark-xx:page', 'projects'],
            expect.objectContaining({ type: 'projects', return: 'one' }),
          )
        })

        it('should be able maps results through PageMapper and commits to the stores', async () => {
          requesterApi.query.mockResolvedValue(
            makePageRaw({
              id: 'page-id-01',
              uid: 'about',
              data: {
                title: 'About',
                body: [],
              },
            }),
          )

          await sut.fetch('about')

          expect(pageMapper.config).toHaveBeenCalledOnce()
          expect(pageMapper.toStore).toHaveBeenCalledOnce()
          expect(pageConfigsStore.actions.setPageConfig).toHaveBeenCalledOnce()
          expect(fetcherPagesStore.actions.setPage).toHaveBeenCalledOnce()

          expect(fetcherPagesStore.data.about.id).toBe('page-id-01')
          expect(fetcherPagesStore.data.about.slug).toBe('about')
          expect(fetcherPagesStore.data.about.title).toBe('About')
          expect(pageConfigsStore.data.list['/about']).toBeTruthy()
        })

        it('shouldn`t call store setters or mapper when the api rejects', async () => {
          requesterApi.query.mockRejectedValue(new Error('fail'))
          const pageFetch = sut.fetch('home')

          await expect(pageFetch).rejects.toThrowError()

          expect(pageMapper.toStore).not.toHaveBeenCalled()
          expect(pageMapper.config).not.toHaveBeenCalled()
          expect(pageConfigsStore.actions.setPageConfig).not.toHaveBeenCalled()
          expect(fetcherPagesStore.actions.setPage).not.toHaveBeenCalled()
        })

        it('should sets status to `error` and re-throws when the api rejects', async () => {
          requesterApi.query.mockRejectedValue(new Error('network failure'))
          const pageFetch = sut.fetch('projects')

          await expect(pageFetch).rejects.toThrow('network failure')

          expect(fetcherPagesStore.actions.setPageStatus).toHaveBeenCalledWith('projects', 'error')
          expect(fetcherPagesStore.data.projects.status).toBe('error')
        })

        it('should be able invokes the callback option on success', async () => {
          const callback = vi.fn()

          await sut.fetch('about', { callback })

          expect(callback).toHaveBeenCalledOnce()
        })
      })
    })
  })
})
