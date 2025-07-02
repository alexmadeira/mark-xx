import { ZETechnologyKey } from '@/enums/technology'

import { z } from 'zod'

import { ZDataHero } from '../content-data/hero'

export const ZHeroTypeContentMeta = z.object({
  waitTime: z.number(),
  eraseSpeed: z.number(),
  writingSpeed: z.number(),
})

export const ZHeroTypeContent = z
  .object({
    id: z.string(),
    name: z.string(),
    color: z.string(),
    banner: z.string(),
    content: z.string(),
  })
  .and(ZHeroTypeContentMeta)

export const ZHeroTypingSequence = z.array(ZHeroTypeContent)

export const ZHeroProps = z.object({
  settings: ZDataHero,
  start: ZETechnologyKey,
  delay: z.coerce.number().positive(),
  speed: z.coerce.number().positive(),
  deletionSpeed: z.coerce.number().positive(),
})

//
//
//
//

export type THeroTypeContentMeta = z.infer<typeof ZHeroTypeContentMeta>
export type THeroTypeContent = z.infer<typeof ZHeroTypeContent>
export type THeroTypingSequence = z.infer<typeof ZHeroTypingSequence>

export type THeroProps = z.infer<typeof ZHeroProps>
