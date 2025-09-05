import { z } from 'zod/v4'

import {
  LOADER_EVENTS,
  LOADER_LISTENER_TYPES,
  LOADER_MEDIA_LISTENER_TYPES,
  LOADER_MEDIA_TYPES,
  LOADER_REQUEST_LISTENER_TYPES,
  LOADER_STATUS,
} from '_SRV/constant/loader'

export const ZELoaderEvents = z.enum(LOADER_EVENTS)
export const ZELoaderMediaType = z.enum(LOADER_MEDIA_TYPES)
export const ZELoaderListenerRequestType = z.enum(LOADER_REQUEST_LISTENER_TYPES)
export const ZELoaderListenerMediaType = z.enum(LOADER_MEDIA_LISTENER_TYPES)
export const ZELoaderListenerType = z.enum(LOADER_LISTENER_TYPES)
export const ZELoaderStatus = z.enum(LOADER_STATUS)

//
//
//
//

export type TELoaderEvents = z.infer<typeof ZELoaderEvents>
export type TELoaderMediaType = z.infer<typeof ZELoaderMediaType>
export type TELoaderListenerRequestType = z.infer<typeof ZELoaderListenerRequestType>
export type TELoaderListenerMediaType = z.infer<typeof ZELoaderListenerMediaType>
export type TELoaderListenerType = z.infer<typeof ZELoaderListenerType>
export type TELoaderStatus = z.infer<typeof ZELoaderStatus>
