import type { githubPaths } from '_CFG/requester/paths/github'
import type { Requester } from '_SRV/builder/requester'
import type { TFakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'

import { makeRepositoryLanguageRaw } from '_TEST/utils/factories/fetcher/make-repository-language-raw'
import { fakeRequesterApi } from '_TEST/utils/stubs/api/fake-requester-api'
import { RepositoryLanguageMapperMock } from '_TEST/utils/stubs/mapper/fake-repository-language-mapper'
import { FakeFetcherRepositoryLanguagesStore } from '_TEST/utils/stubs/stores/fake-fetcher-repository-languages-store'

import { RepositoryLanguagesFetcher } from '_SRV/fetcher/repository-languages-fetcher'

vi.mock('~/env', () => ({
  env: {
    VITE_GITHUB_OMIT_LANGUAGES: [],
    VITE_GITHUB_OMIT_REPOSITORY: [],
  },
}))

let repositoryLanguageMapper: RepositoryLanguageMapperMock
let repositoryLanguagesStore: FakeFetcherRepositoryLanguagesStore
let requesterApi: TFakeRequesterApi
let sut: RepositoryLanguagesFetcher

const defaultOptions = {
  params: {
    owner: 'owner-01',
    name: 'repository-01',
  },
}

describe('Services', () => {
  beforeEach(() => {
    repositoryLanguagesStore = new FakeFetcherRepositoryLanguagesStore()
    repositoryLanguageMapper = new RepositoryLanguageMapperMock()
    requesterApi = fakeRequesterApi()

    requesterApi.query.mockResolvedValue({})
    sut = new RepositoryLanguagesFetcher(
      requesterApi as unknown as Requester<typeof githubPaths>,
      repositoryLanguageMapper,
      repositoryLanguagesStore,
    )
  })

  describe('Fetcher', () => {
    describe('Repository Languages', () => {
      describe('Fetch', () => {
        it('should be able', async () => {
          await sut.fetch('repository-languages', defaultOptions)
          expect(requesterApi.query).toHaveBeenCalledTimes(2)
        })
        it('should sets status to `loading` before the api call', async () => {
          const languagesFetche = sut.fetch('repository-languages:loading', defaultOptions)

          expect(repositoryLanguagesStore.actions.setStatus).toHaveBeenCalledWith('loading')
          expect(repositoryLanguagesStore.data.status).toBe('loading')

          await languagesFetche
        })
        it('should sets status to `loaded` after success api call', async () => {
          const languagesFetche = sut.fetch('repository-languages:loaded', defaultOptions)
          expect(repositoryLanguagesStore.data.status).toBe('loading')

          await languagesFetche

          expect(repositoryLanguagesStore.actions.setStatus).toHaveBeenCalledWith('loaded')
          expect(repositoryLanguagesStore.data.status).toBe('loaded')
        })
        it('should queries the languages api with the correct key and params', async () => {
          await sut.fetch('repository-languages:params', defaultOptions)

          expect(requesterApi.query).toHaveBeenNthCalledWith(
            1,
            'github:repository-languages',
            ['github:repository-languages', 'repository-languages:params'],
            expect.objectContaining({ owner: 'owner-01', repo: 'repository-01' }),
          )
        })
        it('should queries the packages api with the correct key and params', async () => {
          await sut.fetch('repository-languages:packages-params', defaultOptions)

          expect(requesterApi.query).toHaveBeenNthCalledWith(
            2,
            'github:repository-packages',
            ['github:repository-packages', 'repository-languages:packages-params'],
            expect.objectContaining({ owner: 'owner-01', repo: 'repository-01' }),
          )
        })
        it('should be able maps result through RepositoryLanguageMapper and commits to the store', async () => {
          requesterApi.query
            .mockResolvedValueOnce(
              makeRepositoryLanguageRaw({
                TypeScript: 5000,
                JavaScript: 2000,
                CSS: 350,
              }),
            )
            .mockResolvedValueOnce({ content: btoa(JSON.stringify({ dependencies: { react: '^19.0.0' } })) })

          await sut.fetch('repository-languages:mapper', defaultOptions)

          expect(repositoryLanguageMapper.toStoreSpy).toHaveBeenCalledOnce()
          expect(repositoryLanguagesStore.actions.setList).toHaveBeenCalledWith('repository-01', expect.any(Array))

          expect(repositoryLanguagesStore.data.list['repository-01'][0].name).toBe('TypeScript')
          expect(repositoryLanguagesStore.data.list['repository-01'][0].usage).toBe(5000)
        })
        it('should keep fetching languages when packages endpoint fails', async () => {
          requesterApi.query
            .mockResolvedValueOnce(makeRepositoryLanguageRaw({ TypeScript: 3000 }))
            .mockRejectedValueOnce(new Error('package.json not found'))

          await sut.fetch('repository-languages:packages-fail', defaultOptions)

          expect(repositoryLanguageMapper.toStoreSpy).toHaveBeenCalledWith(
            expect.any(Object),
            expect.objectContaining({}),
          )
          expect(repositoryLanguagesStore.actions.setStatus).toHaveBeenCalledWith('loaded')
        })
        it('should not query api and should sets status loaded when repository is disabled', async () => {
          await sut.fetch('repository-languages:disabled', {
            params: {
              owner: 'alexmadeira',
              name: 'alexmadeira',
            },
          })

          expect(requesterApi.query).not.toHaveBeenCalled()
          expect(repositoryLanguagesStore.actions.setStatus).toHaveBeenCalledWith('loaded')
          expect(repositoryLanguagesStore.actions.setList).not.toHaveBeenCalled()
        })
        it('should sets status to `error` and re-throws when language api rejects', async () => {
          requesterApi.query.mockRejectedValue(new Error('network failure'))
          const languagesFetche = sut.fetch('repository-languages:error', defaultOptions)

          await expect(languagesFetche).rejects.toThrow('network failure')

          expect(repositoryLanguagesStore.actions.setStatus).toHaveBeenCalledWith('error')
          expect(repositoryLanguagesStore.data.status).toBe('error')
          expect(repositoryLanguageMapper.toStoreSpy).not.toHaveBeenCalled()
          expect(repositoryLanguagesStore.actions.setList).not.toHaveBeenCalled()
        })
        it('should be able invokes callback option on success', async () => {
          const callback = vi.fn()

          await sut.fetch('repository-languages:callback', {
            ...defaultOptions,
            callback,
          })

          expect(callback).toHaveBeenCalledOnce()
        })
      })
    })
  })
})
