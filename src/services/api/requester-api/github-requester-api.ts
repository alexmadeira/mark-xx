import type { ILoader } from '@/interfaces/loader'
import type {
  TApiAxiosInstance,
  TApiAxiosProps,
  TApiAxiosRequestErrorProps,
  TApiAxiosRequestFinishedProps,
  TApiAxiosRequestStartedProps,
} from '@/services/api/api-axios'

import axios from 'axios'

import { RequesterApi } from '_SRV/builder/requester/requester-api'

import { env } from '~/env'

export class GitHubRequesterApi extends RequesterApi<TApiAxiosInstance> {
  static create(loader: ILoader, props?: TApiAxiosProps) {
    return new GitHubRequesterApi(loader, props).setup()
  }

  private setup() {
    this.api = axios.create({
      baseURL: env.VITE_GITHUB_API,
      headers: {
        Authorization: `Bearer ${env.VITE_GITHUB_ACCESS_TOKEN}`,
      },
    })

    this.api.interceptors.request.use(this.requestStarted.bind(this), this.requestError.bind(this))
    this.api.interceptors.response.use(this.requestFinished.bind(this), this.requestError.bind(this))

    return this
  }

  private requestStarted(...[config]: TApiAxiosRequestStartedProps) {
    this.loader.requestStarted(config.url!)
    return config
  }

  private requestFinished(...[response]: TApiAxiosRequestFinishedProps) {
    this.loader.requestFinished(response.config.url!)
    return response
  }

  private requestError(...[error]: TApiAxiosRequestErrorProps) {
    this.loader.requestError(error.config!.url!)
    return Promise.reject(error)
  }

  public async get<T = unknown>(url: string, config?: Record<string, unknown>): Promise<T> {
    const result = await this.api.get<T>(url, config)
    return result.data
  }

  public async delete<T = unknown>(url: string, config?: Record<string, unknown>): Promise<T> {
    const result = await this.api.delete<T>(url, config)
    return result.data
  }

  public async post<T = unknown>(url: string, data?: unknown, config?: Record<string, unknown>): Promise<T> {
    const result = await this.api.post<T>(url, data, config)
    return result.data
  }

  public async put<T = unknown>(url: string, data?: unknown, config?: Record<string, unknown>): Promise<T> {
    const result = await this.api.put<T>(url, data, config)
    return result.data
  }

  public async patch<T = unknown>(url: string, data?: unknown, config?: Record<string, unknown>): Promise<T> {
    const result = await this.api.patch<T>(url, data, config)
    return result.data
  }
}
