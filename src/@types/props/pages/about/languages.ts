import type { HTMLAttributes } from 'react'

import { ZSchemaUsageLanguage } from '@/services/schema/usage-language'

import { z } from 'zod/v4'

export const ZLanguagesTitleProps = z.custom<HTMLAttributes<HTMLHeadingElement>>()

export const ZLanguagesBarProps = z.object({
  ...ZSchemaUsageLanguage.shape,
})
export const ZLanguagesUsageDetailProps = z.object({
  ...ZSchemaUsageLanguage.shape,
})

//
//
//
//

export type TLanguagesTitleProps = z.infer<typeof ZLanguagesTitleProps>
export type TLanguagesBarProps = z.infer<typeof ZLanguagesBarProps>
export type TLanguagesUsageDetailProps = z.infer<typeof ZLanguagesUsageDetailProps>
