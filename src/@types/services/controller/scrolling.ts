import type Lenis from 'lenis'
import type { LenisOptions, ScrollToOptions } from 'lenis'

import { z } from 'zod'

export const ZScrollingTarget = z.union([z.number(), z.string(), z.custom<HTMLElement>()])

export const ZScrollingToOption = z.custom<ScrollToOptions>()

export const ZScrollingProps = z.object({ lenis: z.custom<Lenis>() })
export const ZScrollingCreateProps = z.intersection(z.custom<LenisOptions>(), z.object({}))

//
//
//
//

export type TScrollingTarget = z.infer<typeof ZScrollingTarget>
export type TScrollingToOption = z.infer<typeof ZScrollingToOption>

export type TScrollingProps = z.infer<typeof ZScrollingProps>
export type TScrollingCreateProps = z.infer<typeof ZScrollingCreateProps>
