import { z } from 'zod/v4'

import {
  LOADER_LISTENER_TYPES,
  LOADER_MEDIA_LISTENER_TYPES,
  LOADER_MEDIA_TYPES,
  LOADER_REQUEST_LISTENER_TYPES,
} from '_SRV/constant/loader'

export const ZEMediaType = z.enum(LOADER_MEDIA_TYPES)
export const ZEListenerRequestType = z.enum(LOADER_REQUEST_LISTENER_TYPES)
export const ZEListenerMediaType = z.enum(LOADER_MEDIA_LISTENER_TYPES)
export const ZEListenerType = z.enum(LOADER_LISTENER_TYPES)

//
//
//
//

export type TEMediaType = z.infer<typeof ZEMediaType>
export type TEListenerRequestType = z.infer<typeof ZEListenerRequestType>
export type TEListenerMediaType = z.infer<typeof ZEListenerMediaType>
export type TEListenerType = z.infer<typeof ZEListenerType>
