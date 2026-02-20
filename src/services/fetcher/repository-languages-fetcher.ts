import type { githubPaths } from '_CFG/requester/paths/github'
import type { Requester } from '_SRV/builder/requester'
import type { TLanguagesFetcherProps } from '@/services/fetcher/languages'

import _ from 'lodash'

import { RepositoryLanguageMapper } from '_SRV/mapper/repository-language-mapper'

import { useFetcherRepositoryLanguages } from '_STR/useFetcherRepositoryLanguages'

import { env } from '~/env'

import { Fetcher } from './fetcher'

export class RepositoryLanguagesFetcher extends Fetcher<TLanguagesFetcherProps> {
  private readonly fetcherRepositoryLanguagesActions = useFetcherRepositoryLanguages.getState().actions

  constructor(private readonly api: Requester<typeof githubPaths>) {
    super()
  }

  private async fetchLanguages(name: string, options: TLanguagesFetcherProps) {
    const result = await this.api.query('github:repository-languages', ['github:repository-languages', name], {
      owner: options.params.owner,
      repo: options.params.name,
    })

    return _.omit(result, env.VITE_GITHUB_OMIT_LANGUAGES)
  }

  private async fetchPackages(name: string, options: TLanguagesFetcherProps): Promise<Record<string, string>> {
    if (env.VITE_GITHUB_OMIT_REPOSITORY.includes(options.params.name)) return {}

    try {
      const { content } = await this.api.query('github:repository-packages', ['github:repository-packages', name], {
        owner: options.params.owner,
        repo: options.params.name,
      })
      const packageContent = JSON.parse(atob(content))

      return {
        ..._.get(packageContent, 'dependencies', {}),
        ..._.get(packageContent, 'devDependencies', {}),
      }
    } catch {
      return {}
    }
  }

  private isEnabledRepo(options: TLanguagesFetcherProps) {
    if (options.params.owner === options.params.name) return false
    if (env.VITE_GITHUB_OMIT_REPOSITORY.includes(options.params.name)) return false
    return true
  }

  public async fetch(name: string, options: TLanguagesFetcherProps) {
    this.fetcherRepositoryLanguagesActions.setStatus('loading')
    if (!this.isEnabledRepo(options)) return this.fetcherRepositoryLanguagesActions.setStatus('loaded')

    try {
      const [result, packages] = await Promise.all([
        this.fetchLanguages(name, options),
        this.fetchPackages(name, options),
      ])

      this.fetcherRepositoryLanguagesActions.setList(
        options.params.name,
        RepositoryLanguageMapper.toStore(result, packages),
      )

      this.fetcherRepositoryLanguagesActions.setStatus('loaded')

      if (options.callback) options.callback()
    } catch (error) {
      this.fetcherRepositoryLanguagesActions.setStatus('error')
      throw error
    }
  }

  public prefetch(name: string, options: TLanguagesFetcherProps) {
    this.refetch(name, options)

    return {
      tags: ['languages'],
      name,
      fetch: () => this.fetch(name, options),
    }
  }
}
