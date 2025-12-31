import { z } from 'zod/v4'

export const ZContentPresenterTemplate = z.string().nullish()
export const ZContentPresenterData = z.record(z.string(), z.unknown())

export const ZContentPresenterRenderProps = z.tuple([ZContentPresenterTemplate, ZContentPresenterData.optional()])

export const ZContentPresenterProps = z.unknown()

//
//
//

export type TContentPresenterTemplate = z.infer<typeof ZContentPresenterTemplate>
export type TContentPresenterData = z.infer<typeof ZContentPresenterData>

export type TContentPresenterRenderProps = z.infer<typeof ZContentPresenterRenderProps>
export type TContentPresenterProps = z.infer<typeof ZContentPresenterProps>
