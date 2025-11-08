import { ZELoaderListenerMediaType } from '@/enums/loader'

import { z } from 'zod/v4'

export const ZLoaderElementImage = z.instanceof(HTMLImageElement)
export const ZLoaderElementVideo = z.instanceof(HTMLVideoElement)
export const ZLoaderMediaImage = z.object({
  el: ZLoaderElementImage,
  type: z.literal('image'),
})
export const ZLoaderMediaVideo = z.object({
  el: ZLoaderElementVideo,
  type: z.literal('video'),
})
export const ZLoaderLoadedMediaImage = z.object({
  ...ZLoaderMediaImage.shape,
  cacheUrl: z.url(),
})
export const ZLoaderLoadedMediaVideo = z.object({
  ...ZLoaderMediaVideo.shape,
  cacheUrl: z.url(),
})

export const ZLoaderMedia = z.discriminatedUnion('type', [ZLoaderMediaImage, ZLoaderMediaVideo])
export const ZLoaderLoadedMedia = z.discriminatedUnion('type', [ZLoaderLoadedMediaImage, ZLoaderLoadedMediaVideo])
export const ZLoaderLoadedMedias = z.map(z.string(), ZLoaderLoadedMedia)
export const ZLoaderMedias = z.map(z.string(), ZLoaderMedia)
export const ZLoaderMediaCallback = z.custom<(payload?: unknown) => unknown | Promise<unknown>>()
export const ZLoaderMediaListeners = z.record(ZELoaderListenerMediaType, z.set(ZLoaderMediaCallback))

export const ZLoaderFetchMediaProps = z.tuple([z.url()])
export const ZLoaderMediaLoadedProps = z.tuple([z.url()])
export const ZLoaderGetCachedMediaProps = z.tuple([z.url()])
export const ZLoaderSaveMediaToCacheProps = z.tuple([z.url()])
export const ZLoaderGetMediaOriginalSrcProps = z.tuple([z.union([ZLoaderElementImage, ZLoaderElementVideo])])
export const ZLoaderIsBlobProps = z.tuple([z.url()])

export const ZLoaderMediaNotifyListenersProps = z.tuple([ZELoaderListenerMediaType, z.unknown().optional()])
export const ZLoaderMediaSubscribeProps = z.tuple([ZELoaderListenerMediaType, ZLoaderMediaCallback])

//
//
//

export type TLoaderMediaImage = z.infer<typeof ZLoaderMediaImage>
export type TLoaderMediaVideo = z.infer<typeof ZLoaderMediaVideo>

export type TLoaderMedia = z.infer<typeof ZLoaderMedia>
export type TLoaderLoadedMedia = z.infer<typeof ZLoaderLoadedMedia>
export type TLoaderLoadedMedias = z.infer<typeof ZLoaderLoadedMedias>
export type TLoaderMedias = z.infer<typeof ZLoaderMedias>
export type TLoaderMediaCallback = z.infer<typeof ZLoaderMediaCallback>
export type TLoaderMediaListeners = z.infer<typeof ZLoaderMediaListeners>

export type TLoaderFetchMediaProps = z.infer<typeof ZLoaderFetchMediaProps>
export type TLoaderMediaLoadedProps = z.infer<typeof ZLoaderMediaLoadedProps>
export type TLoaderGetCachedMediaProps = z.infer<typeof ZLoaderGetCachedMediaProps>
export type TLoaderSaveMediaToCacheProps = z.infer<typeof ZLoaderSaveMediaToCacheProps>
export type TLoaderGetMediaOriginalSrcProps = z.infer<typeof ZLoaderGetMediaOriginalSrcProps>
export type TLoaderIsBlobProps = z.infer<typeof ZLoaderIsBlobProps>

export type TLoaderMediaNotifyListenersProps = z.infer<typeof ZLoaderMediaNotifyListenersProps>
export type TLoaderMediaSubscribeProps = z.infer<typeof ZLoaderMediaSubscribeProps>
