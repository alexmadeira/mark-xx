import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { Requester } from '_SRV/builder/requester'
import type { IFetcher } from '@/interfaces/fetcher'
import type { TUsageLanguageFetcherProps } from '@/services/fetcher/usage-language'

import { useFetcherUsageLanguages } from '_STR/useFetcherUsageLanguages'

export class UsageLanguagesFetcher implements IFetcher<TUsageLanguageFetcherProps> {
  private readonly fetcherUsageLsageLanguageActions = useFetcherUsageLanguages.getState().actions

  constructor(private readonly api: Requester<typeof markXXPaths>) {}

  public async fetch(name: string, options: TUsageLanguageFetcherProps = {}) {
    this.fetcherUsageLsageLanguageActions.setStatus('loading')
    try {
      const result = await this.api.query('mark-xx:languages-usage', ['mark-xx:languages-usage', name])

      this.fetcherUsageLsageLanguageActions.setTotal(result.total)
      this.fetcherUsageLsageLanguageActions.setList(result.languages)
      this.fetcherUsageLsageLanguageActions.setStatus('loaded')

      if (options.callback) options.callback()
    } catch (error) {
      this.fetcherUsageLsageLanguageActions.setStatus('error')
      throw error
    }
  }

  public prefetch(name: string, options: TUsageLanguageFetcherProps = {}) {
    return {
      tags: ['usage-languages'],
      name,
      fetch: () => this.fetch(name, options),
    }
  }
}
