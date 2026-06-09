import type { TFakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'

import { ProjectsFetcher } from '_SRV/fetcher/projects-fetcher'
import { fakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'
import { ProjectMapperMock } from '_TEST/utils/stubs/mapper/fake-project-mapper'
import { FakeFetcherProjectsStore } from '_TEST/utils/stubs/stores/fake-fetcher-projects-store'

vi.stubGlobal('window', { addEventListener: vi.fn() })

let projectMapper: ProjectMapperMock
let projectsStore: FakeFetcherProjectsStore
let requesterApi: TFakeRequesterApi
let sut: ProjectsFetcher

describe('Services', () => {
  beforeEach(() => {
    projectsStore = new FakeFetcherProjectsStore()
    projectMapper = new ProjectMapperMock()
    requesterApi = fakeRequesterApi()

    requesterApi.query.mockResolvedValue([])
    sut = new ProjectsFetcher(requesterApi, projectMapper, projectsStore)
  })

  describe('Fetcher', () => {
    describe('Repositories', () => {
      describe('Fetch', () => {
        it('should be able', async () => {
          const result = sut.prefetch('projects:prefetch')

          expect(result.tags).toEqual(['projects'])
          expect(result.name).toBe('projects:prefetch')
          expect(result.fetch).toBeTypeOf('function')
        })
        it('should return a fetch delegates to this.fetch', async () => {
          const result = sut.prefetch('projects:delegate-fetch')

          await result.fetch()
          expect(requesterApi.query).toHaveBeenCalledOnce()
        })
      })
    })
  })
})
