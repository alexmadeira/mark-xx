import type {
  TApiRequesterFetchProps,
  TApiRequesterInstance,
  TApiRequesterMutateProps,
  TApiRequesterProps,
  TApiRequesterQueryProps,
} from '@/services/api/api-requester'
import type { Nullish } from '@/utils/nullish'

import axios, { AxiosError } from 'axios'
import qs from 'qs'

import { queryClient } from '_SRV/lib/react-query'

export class ApiRequester {
  private api: Nullish<TApiRequesterInstance>

  protected constructor(private readonly _props: TApiRequesterProps) {
    this.setup()
  }

  static create(props: TApiRequesterProps) {
    return new ApiRequester(props)
  }

  private setup() {
    this.api = axios.create({
      baseURL: this.host,
    })
  }

  private async fetch({ path, body, params, signal }: TApiRequesterFetchProps) {
    if (!this.api) throw new Error('API instance is not initialized')

    const queryString = params ? '?' + qs.stringify(params) : ''

    const requestPath = path + queryString
    const requestBody = { ...body }

    return await this.api.post(requestPath, requestBody, { signal })
  }

  public async mutate(...[path, body, params]: TApiRequesterMutateProps) {
    try {
      const response = await this.fetch({ path, body, params })
      return response.data
    } catch (err) {
      const error = err as AxiosError
      console.error('API Mutate Error:', error.response?.data)
    }
  }

  public async query(...[queryKey, path, body, params]: TApiRequesterQueryProps) {
    try {
      const response = await queryClient.fetchQuery({
        queryKey: [queryKey],
        queryFn: async ({ signal }) => await this.fetch({ path, body, params, signal }),
        // ...req.options,
      })

      return response.data
    } catch (err) {
      const error = err as AxiosError
      console.error('API Query Error:', error.response?.data)
    }
  }

  public get host() {
    return this._props.host
  }
}
