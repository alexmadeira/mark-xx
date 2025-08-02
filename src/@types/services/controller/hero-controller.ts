import { z } from 'zod/v4'

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
    type: z.string(),
  })
  .and(ZHeroTypeContentMeta)

export const ZHeroProps = z.object({
  settings: ZDataHero,
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

export type THeroProps = z.infer<typeof ZHeroProps>
