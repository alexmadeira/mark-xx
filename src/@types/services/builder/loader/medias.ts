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

export const ZLoaderMediaEventPayload = z.union([z.string(), z.number()]).optional()
export const ZLoaderMediaEvents = z.object({
  'MEDIA:Error': z.void(),
  'MEDIA:Started': z.string(),
  'MEDIA:Finished': z.string(),
  'MEDIA:AllFinished': z.void(),
  'MEDIA:Update': z.number(),
  'MEDIA:CheckDocument': z.void(),
  'MEDIA:ReCheckDocument': z.void(),
  'MEDIA:VIDEO:Error': z.string(),
  'MEDIA:VIDEO:Started': z.string(),
  'MEDIA:VIDEO:Finished': z.string(),
  'MEDIA:VIDEO:Update': z.number(),
  'MEDIA:VIDEO:AllFinished': z.void(),
  'MEDIA:IMAGE:Error': z.string(),
  'MEDIA:IMAGE:Started': z.string(),
  'MEDIA:IMAGE:Finished': z.string(),
  'MEDIA:IMAGE:Update': z.number(),
  'MEDIA:IMAGE:AllFinished': z.void(),
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

export const ZLoaderMediaNotifyListenersProps = z.tuple([ZELoaderListenerMediaType, ZLoaderMediaEventPayload])
export const ZLoaderMediaSubscribeProps = z.tuple([ZELoaderListenerMediaType, ZLoaderMediaCallback])

//
//
//

export type TLoaderMediaImage = z.infer<typeof ZLoaderMediaImage>
export type TLoaderMediaVideo = z.infer<typeof ZLoaderMediaVideo>

export type TLoaderMediaEventPayload = z.infer<typeof ZLoaderMediaEventPayload>

export type TLoaderMedia = z.infer<typeof ZLoaderMedia>
export type TLoaderMediaEvents = z.infer<typeof ZLoaderMediaEvents>
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
