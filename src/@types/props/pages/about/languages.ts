import type { HTMLMotionProps } from 'motion/react'
import type { HTMLAttributes } from 'react'

import { ZSchemaGithubRepositoryLanguage } from '@/services/schema/github-repository-language'

import { z } from 'zod/v4'

export const ZLanguagesTitleProps = z.custom<HTMLAttributes<HTMLHeadingElement>>()
export const ZLanguageUsageBarProps = z.intersection(
  z.custom<Omit<HTMLMotionProps<'div'>, 'ref'>>(),
  z.object({ size: z.number() }),
)

export const ZLanguageUsageLibProps = z.intersection(
  z.custom<HTMLAttributes<HTMLHeadingElement>>(),
  z.object({
    ...ZSchemaGithubRepositoryLanguage.shape,
    totalUsage: z.number(),
  }),
)

export const ZLanguageUsageProps = z.intersection(
  z.custom<HTMLAttributes<HTMLHeadingElement>>(),
  z.object({
    ...ZSchemaGithubRepositoryLanguage.shape,
    libs: ZSchemaGithubRepositoryLanguage.array(),
  }),
)

export const ZLanguageTooltipUsageProps = z.intersection(
  z.custom<HTMLAttributes<HTMLHeadingElement>>(),
  z.object({
    ...ZSchemaGithubRepositoryLanguage.shape,
    libs: ZSchemaGithubRepositoryLanguage.array(),
    language: z.custom<HTMLElement>().nullish(),
  }),
)

export const ZLanguageTooltipUsageLibProps = ZLanguageUsageLibProps

//
//
//
//

export type TLanguagesTitleProps = z.infer<typeof ZLanguagesTitleProps>
export type TLanguageUsageBarProps = z.infer<typeof ZLanguageUsageBarProps>
export type TLanguageUsageLibProps = z.infer<typeof ZLanguageUsageLibProps>
export type TLanguageTooltipUsageProps = z.infer<typeof ZLanguageTooltipUsageProps>
export type TLanguageTooltipUsageLibProps = z.infer<typeof ZLanguageTooltipUsageLibProps>
export type TLanguageUsageProps = z.infer<typeof ZLanguageUsageProps>
