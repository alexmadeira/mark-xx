import { ZELoaderEvents } from '@/enums/loader'

import { z } from 'zod/v4'

export const ZLoaderEventCallback = z.custom<(payload?: unknown) => unknown | Promise<unknown>>()
export const ZLoaderEventListeners = z.record(ZELoaderEvents, z.set(ZLoaderEventCallback))

export const ZLoaderEventNotifyListenersProps = z.tuple([ZELoaderEvents, z.unknown().optional()])
export const ZLoaderEventSubscribeProps = z.tuple([ZELoaderEvents, ZLoaderEventCallback])

export const ZLoaderProps = z.object({
  once: z.boolean(),
})

//
//
//

export type TLoaderEventCallback = z.infer<typeof ZLoaderEventCallback>
export type TLoaderEventListeners = z.infer<typeof ZLoaderEventListeners>

export type TLoaderEventNotifyListenersProps = z.infer<typeof ZLoaderEventNotifyListenersProps>
export type TLoaderEventSubscribeProps = z.infer<typeof ZLoaderEventSubscribeProps>

export type TLoaderProps = z.infer<typeof ZLoaderProps>
