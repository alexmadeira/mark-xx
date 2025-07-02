import type { ScrollingController } from '_SRV/controller/scrolling-controller'

import { z } from 'zod/v4'

export const ZOverlapHTMLElement = z.custom<HTMLElement>().nullish()
export const ZOverlapElementOption = z.string()

export const ZOverlapSetTargetProps = z.tuple([z.string(), ZOverlapHTMLElement])
export const ZOverlapAddElementProps = z.tuple([ZOverlapHTMLElement, z.string()])

export const ZOverlapProps = z.object({
  scrolling: z.custom<ScrollingController>(),
})

//
//
//

export type TOverlapHTMLElement = z.infer<typeof ZOverlapHTMLElement>
export type TOverlapElementOption = z.infer<typeof ZOverlapElementOption>

export type TOverlapSetTargetProps = z.infer<typeof ZOverlapSetTargetProps>
export type TOverlapAddElementProps = z.infer<typeof ZOverlapAddElementProps>
export type TOverlapProps = z.infer<typeof ZOverlapProps>
