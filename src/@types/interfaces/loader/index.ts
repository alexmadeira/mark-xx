import type { TELoaderEvents } from '@/enums/loader'

export type TLoaderEventsType = TELoaderEvents
export type TLoaderEventCallback = (payload?: unknown) => unknown | Promise<unknown>

export interface ILoader {
  requestError: (requestKey: string) => void
  requestStarted: (requestKey: string) => void
  requestFinished: (requestKey: string) => void
  on: (type: TLoaderEventsType, callback: TLoaderEventCallback) => void
}
