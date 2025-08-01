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

import axios, { AxiosError } from 'axios'
import _ from 'lodash'
import qs from 'qs'

export class ApiRequester<TPaths extends TApiRequesterPaths> {
  private api: Nullish<TApiRequesterInstance>

  protected constructor(private readonly _props: TApiRequesterProps<TPaths>) {
    this.setup()
  }

  static create<T extends TApiRequesterPaths>(props: TApiRequesterProps<T>) {
    return new ApiRequester(props)
  }

  private setup() {
    this.api = axios.create({
      baseURL: this.host,
    })
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
    try {
      return await this.fetch<TApiRequesterPathInferSchema<TPaths, K>>({
        req: this.paths[request],
        body,
        params,
      })
    } catch (err) {
      const error = err as AxiosError
      console.error('API Mutate Error:', error.response?.data)
    }
  }

  public async query<K extends keyof TPaths>(request: K, ...[queryKey, body, params]: TApiRequesterQueryProps) {
    try {
      const result = await this.queryClient.ensureQueryData({
        ...this.paths[request],
        queryKey: _.castArray(queryKey),
        queryFn: async ({ signal }) =>
          await this.fetch<TApiRequesterPathInferSchema<TPaths, K>>({ req: this.paths[request], body, params, signal }),
      })

      return result
    } catch (err) {
      const error = err as AxiosError
      console.error('API Mutate Error:', error.response?.data)
    }
  }
}
