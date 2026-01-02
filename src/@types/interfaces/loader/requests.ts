import type { TELoaderListenerRequestType } from '@/enums/loader'
import type { AxiosInstance } from 'axios'

export type TLoaderRequestsListenerType = TELoaderListenerRequestType
export type TLoaderRequestsListenerCallback = (payload?: unknown) => unknown | Promise<unknown>

export interface ILoaderRequests {
  loading: number
  loaded: number
  finished: boolean
  addInstance: (instance: AxiosInstance) => void
  subscribe: (type: TLoaderRequestsListenerType, callback: TLoaderRequestsListenerCallback) => void
}
