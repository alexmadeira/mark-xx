import type { TELoaderEvents } from '@/enums/loader'

export type TLoaderEventsType = TELoaderEvents
export type TLoaderEventCallback = (payload?: unknown) => unknown | Promise<unknown>

export interface ILoader<TRequestInstance> {
  addInstance: (instance: TRequestInstance) => void
  on: (type: TLoaderEventsType, callback: TLoaderEventCallback) => void
}
