import type { TFakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'

import { makeProjectRaw } from '_TEST/utils/factories/fetcher/make-project-raw'
import { fakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'
import { PageMapperMock } from '_TEST/utils/stubs/mapper/fake-page-mapper'
import { ProjectMapperMock } from '_TEST/utils/stubs/mapper/fake-project-mapper'
import { FakeFetcherProjectsStore } from '_TEST/utils/stubs/stores/fake-fetcher-projects-store'
import { FakePageConfigsStore } from '_TEST/utils/stubs/stores/fake-page-configs-store'

import { ProjectFetcher } from '_SRV/fetcher/project-fetcher'

let projectMapper: ProjectMapperMock
let pageMapper: PageMapperMock
let projectsStore: FakeFetcherProjectsStore
let pageConfigsStore: FakePageConfigsStore
let requesterApi: TFakeRequesterApi
let sut: ProjectFetcher

describe('Services', () => {
  beforeEach(() => {
    projectsStore = new FakeFetcherProjectsStore()
    pageConfigsStore = new FakePageConfigsStore()
    projectMapper = new ProjectMapperMock()
    pageMapper = new PageMapperMock()
    requesterApi = fakeRequesterApi()

    requesterApi.query.mockResolvedValue(makeProjectRaw())
    sut = new ProjectFetcher(requesterApi, projectMapper, pageMapper, projectsStore, pageConfigsStore)
  })

  describe('Fetcher', () => {
    describe('Project', () => {
      describe('Fetch', () => {
        it('should be able', async () => {
          await sut.fetch('project-01')
          expect(requesterApi.query).toHaveBeenCalledOnce()
        })
        it('should sets status to `loading` before the api call', async () => {
          const projectFetch = sut.fetch('project-loading')

          expect(projectsStore.actions.setProjectPageStatus).toHaveBeenCalledWith('project-loading', 'loading')
          expect(projectsStore.data.pages['project-loading'].status).toBe('loading')

          await projectFetch
        })
        it('should sets status to `loaded` after success api call', async () => {
          const projectFetch = sut.fetch('project-loaded')
          expect(projectsStore.data.pages['project-loaded'].status).toBe('loading')

          await projectFetch

          expect(projectsStore.actions.setProjectPageStatus).toHaveBeenCalledWith('project-loaded', 'loaded')
          expect(projectsStore.data.pages['project-loaded'].status).toBe('loaded')
        })
        it('should queries the api with the correct key and type', async () => {
          await sut.fetch('project:key-type')

          expect(requesterApi.query).toHaveBeenCalledWith(
            'mark-xx:project',
            ['mark-xx:project', 'project:key-type'],
            expect.objectContaining({ type: 'project', return: 'one', uid: 'project:key-type' }),
          )
        })
        it('should passes filter tags through to the api query', async () => {
          await sut.fetch('project:filter-tags', { filter: { tags: ['highlight'] } })

          expect(requesterApi.query).toHaveBeenCalledWith(
            'mark-xx:project',
            expect.any(Array),
            expect.objectContaining({ tags: ['highlight'] }),
          )
        })
        it('should passes filter fields through to the api query', async () => {
          await sut.fetch('project:filter-fields', { filter: { fields: { highlight: true } } })

          expect(requesterApi.query).toHaveBeenCalledWith(
            'mark-xx:project',
            expect.any(Array),
            expect.objectContaining({ fields: { highlight: true } }),
          )
        })
        it('should be able maps results through mapper and commits to the stores', async () => {
          requesterApi.query.mockResolvedValue(
            makeProjectRaw({
              id: 'project-id-01',
              uid: 'project-01',
              data: {
                name: 'Project 01',
                role: 'Frontend Developer',
                body: [{ slice_type: 'page_config', primary: { seo_title: 'Project 01' } }],
              },
            }),
          )

          await sut.fetch('project-01')

          expect(pageMapper.configSpy).toHaveBeenCalledOnce()
          expect(projectMapper.toStoreSpy).toHaveBeenCalledOnce()
          expect(pageConfigsStore.actions.setPageConfig).toHaveBeenCalledOnce()
          expect(projectsStore.actions.setProjectPage).toHaveBeenCalledOnce()

          expect(projectsStore.data.pages['project-01'].id).toBe('project-id-01')
          expect(projectsStore.data.pages['project-01'].slug).toBe('project-01')
          expect(projectsStore.data.pages['project-01'].name).toBe('Project 01')
          expect(pageConfigsStore.data.list['/about']).toBeTruthy()
        })
        it('shouldn`t call store setters or mapper when the api rejects', async () => {
          requesterApi.query.mockRejectedValue(new Error('fail'))
          const projectFetch = sut.fetch('project-error')

          await expect(projectFetch).rejects.toThrowError()

          expect(projectMapper.toStoreSpy).not.toHaveBeenCalled()
          expect(pageMapper.configSpy).not.toHaveBeenCalled()
          expect(pageConfigsStore.actions.setPageConfig).not.toHaveBeenCalled()
          expect(projectsStore.actions.setProjectPage).not.toHaveBeenCalled()
        })
        it('should sets status to `error` and re-throws when the api rejects', async () => {
          requesterApi.query.mockRejectedValue(new Error('network failure'))
          const projectFetch = sut.fetch('project-network-error')

          await expect(projectFetch).rejects.toThrow('network failure')

          expect(projectsStore.actions.setProjectPageStatus).toHaveBeenCalledWith('project-network-error', 'error')
          expect(projectsStore.data.pages['project-network-error'].status).toBe('error')
        })
        it('should be able invokes the callback option on success', async () => {
          const callback = vi.fn()

          await sut.fetch('project-callback', { callback })

          expect(callback).toHaveBeenCalledOnce()
        })
      })
    })
  })
})
