import type { ILoader } from '@/interfaces/loader'
import type {
  TApiPrismicInstance,
  TApiPrismicProps,
  TApiPrismicRequestDeleteProps,
  TApiPrismicRequestErrorProps,
  TApiPrismicRequestFinishedProps,
  TApiPrismicRequestGetByIdProps,
  TApiPrismicRequestGetProps,
  TApiPrismicRequestInjectRelationshipsProps,
  TApiPrismicRequestPatchProps,
  TApiPrismicRequestPostProps,
  TApiPrismicRequestPutProps,
  TApiPrismicRequestReturnTypeProps,
  TApiPrismicRequestStartedProps,
} from '@/services/api/api-prismic'

import { createClient, filter } from '@prismicio/client'
import _ from 'lodash'

import { RequesterApi } from '_SRV/builder/requester/requester-api'

import { env } from '~/env'

import { PrismicUtils } from './utils/prismic-utils'

export class PrismicRequesterApi extends RequesterApi<TApiPrismicInstance> {
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

  private async returnType<T>(...[documents, returnType]: TApiPrismicRequestReturnTypeProps) {
    switch (returnType) {
      case 'first':
        return await this.injectRelationships<T>(_.first(documents))
      case 'last':
        return await this.injectRelationships<T>(_.last(documents))
      case 'all':
      default:
        return await this.injectRelationships<T>(documents)
    }
  }

  private async injectRelationships<T>(...[documents]: TApiPrismicRequestInjectRelationshipsProps) {
    if (!documents) return documents as T

    for (const document of _.castArray(documents)) {
      for (const [key, ids] of Object.entries(PrismicUtils.relationshipKeys(document))) {
        const result = await this.getById(ids)
        _.set(document.data, key, result)
      }
    }

    return documents as T
  }

  public async getById(...[ids, config]: TApiPrismicRequestGetByIdProps) {
    const result = await this.api.getByIDs(_.castArray(ids), {
      fetchOptions: {
        signal: config?.signal,
      },
    })

    return await this.returnType(result.results, config?.return)
  }

  public async get<T>(...[type, config]: TApiPrismicRequestGetProps) {
    this.requestStarted(type)

    try {
      const filters = [filter.at('document.type', type)]
      if (config?.tags) filters.push(filter.at('document.tags', config.tags))
      if (config?.uid) filters.push(filter.at(`my.${type}.uid`, config.uid))
      if (config?.fields) {
        Object.entries(config.fields).forEach(([field, value]) => filters.push(filter.at(`my.${type}.${field}`, value)))
      }

      const result = await this.api.get({
        filters,
        fetchOptions: {
          signal: config?.signal,
        },
      })

      if (!result.results.length) throw new Error('No results found')

      this.requestFinished(type)
      return await this.returnType<T>(result.results, config?.return)
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
