import type { TELoaderListenerRequestType } from '@/enums/loader'

export type TLoaderRequestsListenerType = TELoaderListenerRequestType
export type TLoaderRequestsListenerCallback = (payload?: unknown) => unknown | Promise<unknown>

export interface ILoaderRequests {
  loading: number
  loaded: number
  finished: boolean
  requestError: (path: string) => void
  requestStarted: (path: string) => void
  requestFinished: (path: string) => void
  subscribe: (type: TLoaderRequestsListenerType, callback: TLoaderRequestsListenerCallback) => void
}
