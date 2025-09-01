import type { TEListenerMediaType, TEMediaType } from '@/enums/loader'

export type TLoaderMediasListenerType = TEListenerMediaType

export type TLoaderMediasSize = Record<TEMediaType | 'all', number>
export type TLoaderMediasTotal = Record<TEMediaType | 'all', number>
export type TLoaderMediasListenerCallback = (payload?: unknown) => unknown | Promise<unknown>

export interface ILoaderMedias {
  size: TLoaderMediasSize
  total: TLoaderMediasTotal
  subscribe: (type: TLoaderMediasListenerType, callback: TLoaderMediasListenerCallback) => void
}
