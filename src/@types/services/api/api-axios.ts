import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import { z } from 'zod/v4'

export const ZApiAxiosInstance = z.custom<AxiosInstance>()
export const ZApiAxiosRequestError = z.custom<AxiosError>()
export const ZApiAxiosRequestConfig = z.custom<InternalAxiosRequestConfig>()
export const ZApiAxiosRequestResponse = z.custom<AxiosResponse>()

export const ZApiAxiosRequestErrorProps = z.tuple([ZApiAxiosRequestError])
export const ZApiAxiosRequestStartedProps = z.tuple([ZApiAxiosRequestConfig])
export const ZApiAxiosRequestFinishedProps = z.tuple([ZApiAxiosRequestResponse])

export const ZApiAxiosProps = z.object({})

//
//
//

export type TApiAxiosInstance = z.infer<typeof ZApiAxiosInstance>
export type TApiAxiosRequestError = z.infer<typeof ZApiAxiosRequestError>
export type TApiAxiosRequestConfig = z.infer<typeof ZApiAxiosRequestConfig>
export type TApiAxiosRequestResponse = z.infer<typeof ZApiAxiosRequestResponse>

export type TApiAxiosRequestErrorProps = z.infer<typeof ZApiAxiosRequestErrorProps>
export type TApiAxiosRequestStartedProps = z.infer<typeof ZApiAxiosRequestStartedProps>
export type TApiAxiosRequestFinishedProps = z.infer<typeof ZApiAxiosRequestFinishedProps>

export type TApiAxiosProps = z.infer<typeof ZApiAxiosProps>
