import { ZEListenerMediaType, ZEMediaType } from '@/enums/loader'

import { z } from 'zod/v4'

export const ZLoaderMediaImage = z.object({
  el: z.instanceof(HTMLImageElement),
  type: z.literal('image'),
})
export const ZLoaderMediaVide = z.object({
  el: z.instanceof(HTMLVideoElement),
  type: z.literal('video'),
})

export const ZLoaderMedia = z.discriminatedUnion('type', [ZLoaderMediaImage, ZLoaderMediaVide])
export const ZLoaderTotalMedias = z.record(ZEMediaType, z.number().min(0))
export const ZLoaderMedias = z.map(z.string(), ZLoaderMedia)
export const ZLoaderMediaCallback = z.custom<(payload?: unknown) => unknown | Promise<unknown>>()
export const ZLoaderMediaListeners = z.record(ZEListenerMediaType, z.set(ZLoaderMediaCallback))

export const ZLoaderMediaLoadedProps = z.tuple([ZEMediaType, z.string()])
export const ZLoaderMediaLoadedErrorProps = z.tuple([ZEMediaType, z.string()])

export const ZLoaderMediaNotifyListenersProps = z.tuple([ZEListenerMediaType, z.unknown().optional()])
export const ZLoaderMediaSubscribeProps = z.tuple([ZEListenerMediaType, ZLoaderMediaCallback])

//
//
//

export type TLoaderMediaImage = z.infer<typeof ZLoaderMediaImage>
export type TLoaderMediaVide = z.infer<typeof ZLoaderMediaVide>

export type TLoaderMedia = z.infer<typeof ZLoaderMedia>
export type TLoaderTotalMedias = z.infer<typeof ZLoaderTotalMedias>
export type TLoaderMedias = z.infer<typeof ZLoaderMedias>
export type TLoaderMediaCallback = z.infer<typeof ZLoaderMediaCallback>
export type TLoaderMediaListeners = z.infer<typeof ZLoaderMediaListeners>

export type TLoaderMediaLoadedProps = z.infer<typeof ZLoaderMediaLoadedProps>
export type TLoaderMediaLoadedErrorProps = z.infer<typeof ZLoaderMediaLoadedErrorProps>

export type TLoaderMediaNotifyListenersProps = z.infer<typeof ZLoaderMediaNotifyListenersProps>
export type TLoaderMediaSubscribeProps = z.infer<typeof ZLoaderMediaSubscribeProps>
