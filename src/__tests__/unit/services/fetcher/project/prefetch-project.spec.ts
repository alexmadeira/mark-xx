import type { TFakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'

import { makeProjectRaw } from '_TEST/utils/factories/fetcher/make-project-raw'
import { fakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'
import { PageMapperMock } from '_TEST/utils/stubs/mapper/fake-page-mapper'
import { ProjectMapperMock } from '_TEST/utils/stubs/mapper/fake-project-mapper'
import { FakeFetcherProjectsStore } from '_TEST/utils/stubs/stores/fake-fetcher-projects-store'
import { FakePageConfigsStore } from '_TEST/utils/stubs/stores/fake-page-configs-store'

import { ProjectFetcher } from '_SRV/fetcher/project-fetcher'

vi.stubGlobal('window', { addEventListener: vi.fn() })

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
      describe('Prefetch', () => {
        it('should be able', async () => {
          const result = sut.prefetch('project-01')

          expect(result.tags).toEqual(['project'])
          expect(result.name).toBe('project-01')
          expect(result.fetch).toBeTypeOf('function')
        })

        it('should return a fetch delegates to this.fetch', async () => {
          const result = sut.prefetch('project-02')

          await result.fetch()
          expect(requesterApi.query).toHaveBeenCalledOnce()
        })
      })
    })
  })
})
