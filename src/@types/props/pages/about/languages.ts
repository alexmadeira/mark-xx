import type { HTMLAttributes } from 'react'

import { z } from 'zod/v4'

export const ZLanguagesTitleProps = z.custom<HTMLAttributes<HTMLHeadingElement>>()

export const ZLanguagesBarProps = z.object({
  techology: z.unknown(),
})
export const ZLanguagesUsageDetailProps = z.object({
  techology: z.unknown(),
})

//
//
//
//

export type TLanguagesTitleProps = z.infer<typeof ZLanguagesTitleProps>
export type TLanguagesBarProps = z.infer<typeof ZLanguagesBarProps>
export type TLanguagesUsageDetailProps = z.infer<typeof ZLanguagesUsageDetailProps>
