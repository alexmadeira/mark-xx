import { ZELoaderListenerRequestType } from '@/enums/loader'

import { z } from 'zod/v4'

export const ZLoaderLoadingRequests = z.set(z.string())
export const ZLoaderLoadedRequests = z.set(z.string())

export const ZLoaderRequestCallback = z.custom<(payload?: unknown) => unknown | Promise<unknown>>()
export const ZLoaderRequestListeners = z.record(ZELoaderListenerRequestType, z.set(ZLoaderRequestCallback))

export const ZLoaderRequestErrorProps = z.tuple([z.string()])
export const ZLoaderRequestStartedProps = z.tuple([z.string()])
export const ZLoaderRequestFinishedProps = z.tuple([z.string()])

export const ZLoaderRequestNotifyListenersProps = z.tuple([ZELoaderListenerRequestType, z.unknown().optional()])
export const ZLoaderRequestSubscribeProps = z.tuple([ZELoaderListenerRequestType, ZLoaderRequestCallback])

//
//
//

export type TLoaderLoadingRequests = z.infer<typeof ZLoaderLoadingRequests>
export type TLoaderLoadedRequests = z.infer<typeof ZLoaderLoadedRequests>
export type TLoaderRequestCallback = z.infer<typeof ZLoaderRequestCallback>
export type TLoaderRequestListeners = z.infer<typeof ZLoaderRequestListeners>

export type TLoaderRequestErrorProps = z.infer<typeof ZLoaderRequestErrorProps>
export type TLoaderRequestStartedProps = z.infer<typeof ZLoaderRequestStartedProps>
export type TLoaderRequestFinishedProps = z.infer<typeof ZLoaderRequestFinishedProps>
export type TLoaderRequestNotifyListenersProps = z.infer<typeof ZLoaderRequestNotifyListenersProps>
export type TLoaderRequestSubscribeProps = z.infer<typeof ZLoaderRequestSubscribeProps>
