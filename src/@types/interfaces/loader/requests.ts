import type { TEListenerRequestType } from '@/enums/loader'

export type TLoaderRequestsListenerType = TEListenerRequestType
export type TLoaderRequestsListenerCallback = (payload?: unknown) => unknown | Promise<unknown>

export interface ILoaderRequests<TInstance = unknown> {
  size: number
  total: number
  addInstance: (instance: TInstance) => void
  subscribe: (type: TLoaderRequestsListenerType, callback: TLoaderRequestsListenerCallback) => void
}
