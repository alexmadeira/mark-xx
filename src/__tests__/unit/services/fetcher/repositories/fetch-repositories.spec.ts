import type { TFakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'

import { makeRepositoryRaw } from '_TEST/utils/factories/fetcher/make-repository-raw'
import { fakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'
import { RepositoryMapperMock } from '_TEST/utils/stubs/mapper/fake-repository-mapper'
import { FakeFetcherRepositoriesStore } from '_TEST/utils/stubs/stores/fake-fetcher-repositories-store'

import { RepositoriesFetcher } from '_SRV/fetcher/repositories-fetcher'

let repositoryMapper: RepositoryMapperMock
let repositoriesStore: FakeFetcherRepositoriesStore
let requesterApi: TFakeRequesterApi
let sut: RepositoriesFetcher

describe('Services', () => {
  beforeEach(() => {
    repositoriesStore = new FakeFetcherRepositoriesStore()
    repositoryMapper = new RepositoryMapperMock()
    requesterApi = fakeRequesterApi()

    requesterApi.query.mockResolvedValue([])
    sut = new RepositoriesFetcher(requesterApi, repositoryMapper, repositoriesStore)
  })

  describe('Fetcher', () => {
    describe('Repositories', () => {
      describe('Fetch', () => {
        it('should be able', async () => {
          await sut.fetch('repositories')
          expect(requesterApi.query).toHaveBeenCalledOnce()
        })
        it('should sets status to `loading` before the api call', async () => {
          const repositoryFetche = sut.fetch('repositories:loading')

          expect(repositoriesStore.actions.setStatus).toHaveBeenCalledWith('loading')
          expect(repositoriesStore.data.status).toBe('loading')

          await repositoryFetche
        })
        it('should sets status to `loaded` after success api call', async () => {
          const repositoryFetche = sut.fetch('repositories:loaded')
          expect(repositoriesStore.data.status).toBe('loading')
          await repositoryFetche
          expect(repositoriesStore.actions.setStatus).toHaveBeenCalledWith('loaded')
          expect(repositoriesStore.data.status).toBe('loaded')
        })
        it('should queries the api with the correct key', async () => {
          await sut.fetch('repositories:key-type')
          expect(requesterApi.query).toHaveBeenCalledWith(
            'github:repositories',
            ['github:repositories', 'repositories:key-type'],
            expect.any(Object),
          )
        })
        it('should queries the api with default params when none are provided', async () => {
          await sut.fetch('repositories:default-params')
          expect(requesterApi.query).toHaveBeenCalledWith(
            'github:repositories',
            expect.any(Array),
            expect.objectContaining({
              page: 1,
              per_page: 30,
              type: 'all',
              sort: 'updated',
              direction: 'desc',
            }),
          )
        })
        it('should be able overrides defaults with provided params', async () => {
          await sut.fetch('repositories:overrides-params', {
            params: { page: 2, perPage: 10, type: 'owner', sort: 'created', direction: 'asc' },
          })
          expect(requesterApi.query).toHaveBeenCalledWith(
            'github:repositories',
            expect.any(Array),
            expect.objectContaining({
              page: 2,
              per_page: 10,
              type: 'owner',
              sort: 'created',
              direction: 'asc',
            }),
          )
        })
        it('should be able maps results through RepositoryMapper and commits to the store', async () => {
          requesterApi.query.mockResolvedValueOnce([
            makeRepositoryRaw({
              name: 'Repository 01',
              size: 2450,
              owner: 'owner-01',
              private: false,
              language: 'TypeScript',
            }),
            makeRepositoryRaw({
              name: 'Repository 02',
              size: 7850,
              owner: 'owner-01',
              private: true,
              language: 'JavaScript',
            }),
          ])
          await sut.fetch('repositories:mapper')
          expect(repositoryMapper.toStore).toHaveBeenCalledTimes(2)
          expect(repositoriesStore.actions.setList).toHaveBeenCalledOnce()

          expect(repositoriesStore.data.list[0].name).toEqual('Repository 01')
          expect(repositoriesStore.data.list[0].size).toEqual(2450)
          expect(repositoriesStore.data.list[0].owner).toEqual('owner-01')
          expect(repositoriesStore.data.list[0].private).toEqual(false)
          expect(repositoriesStore.data.list[0].language).toEqual('TypeScript')

          expect(repositoriesStore.data.list[1].name).toEqual('Repository 02')
          expect(repositoriesStore.data.list[1].size).toEqual(7850)
          expect(repositoriesStore.data.list[1].owner).toEqual('owner-01')
          expect(repositoriesStore.data.list[1].private).toEqual(true)
          expect(repositoriesStore.data.list[1].language).toEqual('JavaScript')
        })
        it('shouldn`t call setList or RepositoryMapper when the api rejects', async () => {
          requesterApi.query.mockRejectedValue(new Error('fail'))
          const repositoryFetche = sut.fetch('companies:error')
          await expect(repositoryFetche).rejects.toThrowError()

          expect(repositoryMapper.toStore).not.toHaveBeenCalled()
          expect(repositoriesStore.actions.setList).not.toHaveBeenCalled()
        })
        it('should sets status to `error` and re-throws when the api rejects ', async () => {
          requesterApi.query.mockRejectedValue(new Error('network failure'))
          const repositoryFetche = sut.fetch('repositories:error')
          await expect(repositoryFetche).rejects.toThrow('network failure')

          expect(repositoriesStore.actions.setStatus).toHaveBeenCalledWith('error')
          expect(repositoriesStore.data.status).toBe('error')
        })
        it('should be able invokes the callback option on success', async () => {
          const callback = vi.fn()
          await sut.fetch('repositories:callback', { callback })

          expect(callback).toHaveBeenCalledOnce()
        })
      })
    })
  })
})
