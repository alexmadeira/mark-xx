import type { TELoaderEvents } from '@/enums/loader'
import type { AxiosInstance } from 'axios'

export type TLoaderEventsType = TELoaderEvents
export type TLoaderEventCallback = (payload?: unknown) => unknown | Promise<unknown>

export interface ILoader {
  addInstance: (instance: AxiosInstance) => void
  requestError: (requestKey: string) => void
  requestStarted: (requestKey: string) => void
  requestFinished: (requestKey: string) => void
  on: (type: TLoaderEventsType, callback: TLoaderEventCallback) => void
}
