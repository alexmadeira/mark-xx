import type { TELoaderListenerRequestType } from '@/enums/loader'

export type TLoaderRequestsListenerType = TELoaderListenerRequestType
export type TLoaderRequestsListenerCallback = (payload?: unknown) => unknown | Promise<unknown>

export interface ILoaderRequests<TInstance = unknown> {
  loadinng: number
  loaded: number
  finished: boolean
  addInstance: (instance: TInstance) => void
  subscribe: (type: TLoaderRequestsListenerType, callback: TLoaderRequestsListenerCallback) => void
}
