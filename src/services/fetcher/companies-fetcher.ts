import type { markXXPaths } from '_CFG/requester/paths/mark-xx'
import type { IRequester } from '@/interfaces/api'
import type { TCompaniesFetcherProps } from '@/services/fetcher/companies'
import type { TStoreFetcherCompanies } from '@/services/store/fetcher-companies'

import _ from 'lodash'

import { CompanyMapper } from '_SRV/mapper/company-mapper'

import { Fetcher } from './fetcher'

export class CompaniesFetcher extends Fetcher<TCompaniesFetcherProps> {
  constructor(
    private readonly api: IRequester<typeof markXXPaths>,
    private readonly mapper: CompanyMapper,
    private readonly fetcherCompanies: TStoreFetcherCompanies,
  ) {
    super()
  }

  public async fetch(name: string, options: TCompaniesFetcherProps = {}) {
    this.fetcherCompanies.actions.setStatus('loading')
    try {
      const result = await this.api.query('mark-xx:companies', ['mark-xx:companies', name], {
        return: 'all',
        type: 'company',
        tags: _.castArray(options.filter?.tags || []),
        fields: options.filter?.fields,
      })

      this.fetcherCompanies.actions.setList(result.map(this.mapper.toStore))
      this.fetcherCompanies.actions.setStatus('loaded')

      if (options.callback) options.callback()
    } catch (error) {
      this.fetcherCompanies.actions.setStatus('error')
      throw error
    }
  }

  public prefetch(name: string, options: TCompaniesFetcherProps = {}) {
    this.refetch(name, options)

    return {
      tags: ['companies'],
      name,
      fetch: () => this.fetch(name, options),
    }
  }
}
