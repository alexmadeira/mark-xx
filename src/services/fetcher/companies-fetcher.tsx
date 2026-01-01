import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { Requester } from '_SRV/builder/requester'
import type { IFetcher } from '@/interfaces/fetcher'
import type { TCompaniesFetcherProps } from '@/services/fetcher/companies'

import { CompanyMapper } from '_SRV/mapper/company-mapper'

import { useFetcherCompanies } from '_STR/useFetcherCompanies'

export class CompaniesFetcher implements IFetcher<TCompaniesFetcherProps> {
  private readonly companiesActions = useFetcherCompanies.getState().actions

  constructor(private readonly api: Requester<typeof markXXPaths>) {}

  public async fetch(name: string, options: TCompaniesFetcherProps = {}) {
    this.companiesActions.setStatus('loading')
    try {
      const result = await this.api.query('mark-xx:companies', ['mark-xx:companies', name], {
        return: 'all',
        type: 'company',
      })

      this.companiesActions.setList(result.map(CompanyMapper.toStore))
      this.companiesActions.setStatus('loaded')

      if (options.callback) options.callback()
    } catch (error) {
      this.companiesActions.setStatus('error')
      throw error
    }
  }

  public prefetch(name: string, options: TCompaniesFetcherProps = {}) {
    return {
      tags: ['companies'],
      name,
      fetch: () => this.fetch(name, options),
    }
  }
}
