import type { ScrollController } from '_SRV/controller/scroll-controller'

import { z } from 'zod'

export const ZOverlapHTMLElement = z.custom<HTMLElement>().nullish()
export const ZOverlapElementOption = z.string()

export const ZOverlapSetTargetProps = z.tuple([ZOverlapHTMLElement])
export const ZOverlapAddElementProps = z.tuple([ZOverlapHTMLElement, z.string()])

export const ZOverlapProps = z.object({
  name: z.string(),
  scrolling: z.custom<ScrollController>(),
})

//
//
//

export type TOverlapHTMLElement = z.infer<typeof ZOverlapHTMLElement>
export type TOverlapElementOption = z.infer<typeof ZOverlapElementOption>

export type TOverlapSetTargetProps = z.infer<typeof ZOverlapSetTargetProps>
export type TOverlapAddElementProps = z.infer<typeof ZOverlapAddElementProps>
export type TOverlapProps = z.infer<typeof ZOverlapProps>
