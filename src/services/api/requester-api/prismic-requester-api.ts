import type { ILoader } from '@/interfaces/loader'
import type {
  TApiPrismicProps,
  TApiPrismicRequestDeleteProps,
  TApiPrismicRequestErrorProps,
  TApiPrismicRequestFinishedProps,
  TApiPrismicRequestGetProps,
  TApiPrismicRequestPatchProps,
  TApiPrismicRequestPostProps,
  TApiPrismicRequestPutProps,
  TApiPrismicRequestStartedProps,
} from '@/services/api/api-prismic'

import { Client, createClient, filter } from '@prismicio/client'

import { RequesterApi } from '_SRV/builder/requester/requester-api'

import { env } from '~/env'

export class PrismicRequesterApi extends RequesterApi<Client> {
  static create(loader: ILoader, props?: TApiPrismicProps) {
    return new PrismicRequesterApi(loader, props).setup()
  }

  private setup() {
    this.api = createClient(env.VITE_PRISMIC_REPOSITORY_NAME, {
      accessToken: env.VITE_PRISMIC_ACCESS_TOKEN,
    })

    return this
  }

  private requestStarted(...[requestKey]: TApiPrismicRequestStartedProps) {
    this.loader.requestStarted(requestKey)
  }

  private requestFinished(...[requestKey]: TApiPrismicRequestFinishedProps) {
    this.loader.requestFinished(requestKey)
  }

  private requestError(...[requestKey]: TApiPrismicRequestErrorProps) {
    this.loader.requestError(requestKey)
  }

  public async get<T>(...[type, config]: TApiPrismicRequestGetProps) {
    this.requestStarted(type)
    try {
      const filters = [filter.at('document.type', type)]
      if (config?.tags) filters.push(filter.at('document.tags', config.tags))
      if (config?.uid) filters.push(filter.at(`my.${type}.uid`, config.uid))

      const result = await this.api.get({
        filters,
        fetchOptions: {
          signal: config?.signal,
        },
      })
      if (!result.results.length) throw new Error('No results found')

      this.requestFinished(type)
      return result.results[0] as T
    } catch (err) {
      this.requestError(type)
      throw err
    }
  }

  public async delete<T>(..._args: TApiPrismicRequestDeleteProps): Promise<T> {
    throw new Error('Method not implemented.')
  }

  public async post<T>(..._args: TApiPrismicRequestPostProps): Promise<T> {
    throw new Error('Method not implemented.')
  }

  public async put<T>(..._args: TApiPrismicRequestPutProps): Promise<T> {
    throw new Error('Method not implemented.')
  }

  public async patch<T>(..._args: TApiPrismicRequestPatchProps): Promise<T> {
    throw new Error('Method not implemented.')
  }
}
