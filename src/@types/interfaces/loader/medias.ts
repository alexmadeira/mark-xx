import type { TELoaderListenerMediaType, TELoaderMediaType } from '@/enums/loader'

export type TLoaderMediasListenerType = TELoaderListenerMediaType

export type TLoaderMediasLoadinng = Record<TELoaderMediaType | 'all', number>
export type TLoaderMediasLoaded = Record<TELoaderMediaType | 'all', number>
export type TLoaderMediasFinished = Record<TELoaderMediaType | 'all', boolean>
export type TLoaderMediasListenerCallback = (payload?: unknown) => unknown | Promise<unknown>

export interface ILoaderMedias {
  loaded: TLoaderMediasLoaded
  loadinng: TLoaderMediasLoadinng
  finished: TLoaderMediasFinished
  subscribe: (type: TLoaderMediasListenerType, callback: TLoaderMediasListenerCallback) => void
}
