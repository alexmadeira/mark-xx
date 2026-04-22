import type { TFakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'

import { makeProjectRaw } from '_TEST/utils/factories/fetcher/make-project-raw'
import { fakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'
import { ProjectMapperMock } from '_TEST/utils/stubs/mapper/fake-project-mapper'
import { FakeFetcherProjectsStore } from '_TEST/utils/stubs/stores/fake-fetcher-projects-store'

import { ProjectsFetcher } from '_SRV/fetcher/projects-fetcher'

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
    describe('Projects', () => {
      describe('Fetch', () => {
        it('should be able', async () => {
          await sut.fetch('projects')
          expect(requesterApi.query).toHaveBeenCalledOnce()
        })
        it('should queries the api with the correct key and type', async () => {
          await sut.fetch('projects:key-type')

          expect(requesterApi.query).toHaveBeenCalledWith(
            'mark-xx:projects',
            ['mark-xx:projects', 'projects:key-type'],
            expect.objectContaining({ type: 'project', return: 'all' }),
          )
        })
        it('should passes filter tags through to the api query', async () => {
          await sut.fetch('projects:filter-tags', { filter: { tags: ['highlight'] } })

          expect(requesterApi.query).toHaveBeenCalledWith(
            'mark-xx:projects',
            expect.any(Array),
            expect.objectContaining({ tags: ['highlight'] }),
          )
        })
        it('should passes filter fields through to the api query', async () => {
          await sut.fetch('projects:filter-fields', { filter: { fields: { highlight: true } } })

          expect(requesterApi.query).toHaveBeenCalledWith(
            'mark-xx:projects',
            expect.any(Array),
            expect.objectContaining({ fields: { highlight: true } }),
          )
        })
        it('should be able maps results through ProjectMapper and commits to the store', async () => {
          requesterApi.query.mockResolvedValue([
            makeProjectRaw({
              uid: 'project-01',
              data: {
                name: 'Project 01',
                role: 'Frontend Developer',
                content: 'Content 01',
                description: 'Description 01',
                team_size: '10 - 50',
                highlight: true,
                tags: ['react'],
              },
            }),
            makeProjectRaw({
              uid: 'project-02',
              data: {
                name: 'Project 02',
                role: 'Backend Developer',
                content: 'Content 02',
                description: 'Description 02',
                team_size: '2 - 10',
                highlight: false,
                tags: ['node'],
              },
            }),
          ])

          await sut.fetch('projects:mapper')

          expect(projectMapper.toStore).toHaveBeenCalledTimes(2)
          expect(projectsStore.actions.setList).toHaveBeenCalledOnce()

          expect(projectsStore.data.list['projects:mapper'][0].slug).toEqual('project-01')
          expect(projectsStore.data.list['projects:mapper'][0].name).toEqual('Project 01')
          expect(projectsStore.data.list['projects:mapper'][0].role).toEqual('Frontend Developer')
          expect(projectsStore.data.list['projects:mapper'][0].teamSize).toEqual('10 - 50')

          expect(projectsStore.data.list['projects:mapper'][1].slug).toEqual('project-02')
          expect(projectsStore.data.list['projects:mapper'][1].name).toEqual('Project 02')
          expect(projectsStore.data.list['projects:mapper'][1].role).toEqual('Backend Developer')
          expect(projectsStore.data.list['projects:mapper'][1].teamSize).toEqual('2 - 10')
        })
        it('shouldn`t call setList or ProjectMapper when the api rejects', async () => {
          requesterApi.query.mockRejectedValue(new Error('fail'))
          const projectsFetche = sut.fetch('projects:error')

          await expect(projectsFetche).rejects.toThrowError()
          expect(projectMapper.toStore).not.toHaveBeenCalled()
          expect(projectsStore.actions.setList).not.toHaveBeenCalled()
        })
        it('should be able invokes the callback option on success', async () => {
          const callback = vi.fn()
          await sut.fetch('projects:callback', { callback })

          expect(callback).toHaveBeenCalledOnce()
        })
      })
    })
  })
})
