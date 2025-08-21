import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { TUsageLanguageFetcherProps } from '@/services/fetcher/usage-language'

import { ApiRequester } from '_SRV/api/api-requester'

import { useFetcherUsageLanguages } from '_STR/useFetcherUsageLanguages'

export class UsageLanguagesFetcher {
  private readonly usageLanguageActions = useFetcherUsageLanguages.getState().actions

  protected constructor(private readonly api: ApiRequester<typeof markXXPaths>) {}

  public static create(api: ApiRequester<typeof markXXPaths>) {
    return new UsageLanguagesFetcher(api)
  }

  public async fetch(name: string, options: TUsageLanguageFetcherProps = {}) {
    this.usageLanguageActions.setStatus('loading')
    try {
      const result = await this.api.query('mark-xx:languages-usage', ['mark-xx:languages-usage', name])

      this.usageLanguageActions.setTotal(result.total)
      this.usageLanguageActions.setList(result.languages)
      this.usageLanguageActions.setStatus('loaded')

      if (options.callback) options.callback()
      return result
    } catch (error) {
      this.usageLanguageActions.setStatus('error')
      throw error
    }
  }
}
