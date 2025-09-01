import type { ILoader } from '@/interfaces/loader'
import type {
  TApiRequesterFetchProps,
  TApiRequesterInstance,
  TApiRequesterMutateProps,
  TApiRequesterPathInferSchema,
  TApiRequesterPaths,
  TApiRequesterProps,
  TApiRequesterQueryProps,
} from '@/services/api/api-requester'
import type { Nullish } from '@/utils/nullish'
import type { AxiosInstance } from 'axios'

import axios from 'axios'
import _ from 'lodash'
import qs from 'qs'

import { useRequester } from '_STR/useRequester'

export class ApiRequester<TPaths extends TApiRequesterPaths> {
  private api: Nullish<TApiRequesterInstance>

  constructor(
    private readonly _props: TApiRequesterProps<TPaths>,
    private readonly loader: ILoader<AxiosInstance>,
  ) {
    this.setup()
  }

  private setup() {
    this.api = axios.create({
      baseURL: this.host,
    })
    this.loader.addInstance(this.api)
  }

  private async fetch<TResponse = unknown>({ req, body, params, signal }: TApiRequesterFetchProps) {
    if (!this.api) throw new Error('API instance is not initialized')

    const queryString = params ? `?${qs.stringify(params)}` : ''

    const requestPath = `${req.path}${queryString}`
    const requestBody = { ...body }

    const response = await this.api[req.method]<TResponse>(requestPath, requestBody, { signal })

    return response.data
  }

  private get host() {
    return this._props.host
  }

  private get queryClient() {
    return this._props.queryClient
  }

  private get paths() {
    return this._props.paths
  }

  public async mutate<K extends keyof TPaths>(request: K, ...[body, params]: TApiRequesterMutateProps) {
    await useRequester.waitFor('cache.restoreStatus', 'restored')

    return await this.fetch<TApiRequesterPathInferSchema<TPaths, K>>({
      req: this.paths[request],
      body,
      params,
    })
  }

  public async query<K extends keyof TPaths>(request: K, ...[queryKey, body, params]: TApiRequesterQueryProps) {
    await useRequester.waitFor('cache.restoreStatus', 'restored')

    const result = await this.queryClient.ensureQueryData({
      ...this.paths[request],
      queryKey: _.castArray(queryKey),
      queryFn: async ({ signal }) =>
        await this.fetch<TApiRequesterPathInferSchema<TPaths, K>>({ req: this.paths[request], body, params, signal }),
    })

    return result
  }
}
