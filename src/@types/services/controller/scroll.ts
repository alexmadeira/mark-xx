import type Lenis from 'lenis'
import type { LenisOptions, ScrollToOptions } from 'lenis'

import { z } from 'zod'

export const ZScrollTarget = z.union([z.number(), z.string(), z.custom<HTMLElement>()])

export const ZScrollScrollToOption = z.custom<ScrollToOptions>()

export const ZScrollProps = z.object({ lenis: z.custom<Lenis>() })
export const ZScrollCreateProps = z.intersection(z.custom<LenisOptions>(), z.object({}))

//
//
//
//

export type TScrollTarget = z.infer<typeof ZScrollTarget>
export type TScrollScrollToOption = z.infer<typeof ZScrollScrollToOption>

export type TScrollProps = z.infer<typeof ZScrollProps>
export type TScrollCreateProps = z.infer<typeof ZScrollCreateProps>
