import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { Requester } from '_SRV/builder/requester'
import type { IFetcher } from '@/interfaces/fetcher'
import type { TCompaniesFetcherProps } from '@/services/fetcher/companies'

import _ from 'lodash'

import { CompanyMapper } from '_SRV/mapper/company-mapper'

import { useFetcherCompanies } from '_STR/useFetcherCompanies'

export class CompaniesFetcher implements IFetcher<TCompaniesFetcherProps> {
  private readonly fetcherCompaniesActions = useFetcherCompanies.getState().actions

  constructor(private readonly api: Requester<typeof markXXPaths>) {}

  public async fetch(name: string, options: TCompaniesFetcherProps = {}) {
    this.fetcherCompaniesActions.setStatus('loading')
    try {
      const result = await this.api.query('mark-xx:companies', ['mark-xx:companies', name], {
        return: 'all',
        type: 'company',
        tags: _.castArray(options.filter?.tags || []),
        fields: options.filter?.fields,
      })

      this.fetcherCompaniesActions.setList(result.map(CompanyMapper.toStore))
      this.fetcherCompaniesActions.setStatus('loaded')

      if (options.callback) options.callback()
    } catch (error) {
      this.fetcherCompaniesActions.setStatus('error')
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
