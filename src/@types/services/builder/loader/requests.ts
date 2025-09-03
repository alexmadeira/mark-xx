import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import { ZELoaderListenerRequestType } from '@/enums/loader'

import { z } from 'zod/v4'

export const ZLoaderLoadingRequests = z.set(z.string())
export const ZLoaderLoadedRequests = z.set(z.string())

export const ZLoaderRequestError = z.custom<AxiosError>()
export const ZLoaderRequestConfig = z.custom<InternalAxiosRequestConfig>()
export const ZLoaderRequestInstance = z.custom<AxiosInstance>()
export const ZLoaderRequestResponse = z.custom<AxiosResponse>()
export const ZLoaderRequestCallback = z.custom<(payload?: unknown) => unknown | Promise<unknown>>()
export const ZLoaderRequestListeners = z.record(ZELoaderListenerRequestType, z.set(ZLoaderRequestCallback))

export const ZLoaderAddInstanceProps = z.tuple([ZLoaderRequestInstance])
export const ZLoaderRequestErrorProps = z.tuple([ZLoaderRequestError])
export const ZLoaderRequestStartedProps = z.tuple([ZLoaderRequestConfig])
export const ZLoaderRequestFinishedProps = z.tuple([ZLoaderRequestResponse])

export const ZLoaderRequestNotifyListenersProps = z.tuple([ZELoaderListenerRequestType, z.unknown().optional()])
export const ZLoaderRequestSubscribeProps = z.tuple([ZELoaderListenerRequestType, ZLoaderRequestCallback])

//
//
//

export type TLoaderLoadingRequests = z.infer<typeof ZLoaderLoadingRequests>
export type TLoaderLoadedRequests = z.infer<typeof ZLoaderLoadedRequests>
export type TLoaderRequestError = z.infer<typeof ZLoaderRequestError>
export type TLoaderRequestConfig = z.infer<typeof ZLoaderRequestConfig>
export type TLoaderRequestInstance = z.infer<typeof ZLoaderRequestInstance>
export type TLoaderRequestResponse = z.infer<typeof ZLoaderRequestResponse>
export type TLoaderRequestCallback = z.infer<typeof ZLoaderRequestCallback>
export type TLoaderRequestListeners = z.infer<typeof ZLoaderRequestListeners>

export type TLoaderAddInstanceProps = z.infer<typeof ZLoaderAddInstanceProps>
export type TLoaderRequestErrorProps = z.infer<typeof ZLoaderRequestErrorProps>
export type TLoaderRequestStartedProps = z.infer<typeof ZLoaderRequestStartedProps>
export type TLoaderRequestFinishedProps = z.infer<typeof ZLoaderRequestFinishedProps>
export type TLoaderRequestNotifyListenersProps = z.infer<typeof ZLoaderRequestNotifyListenersProps>
export type TLoaderRequestSubscribeProps = z.infer<typeof ZLoaderRequestSubscribeProps>
