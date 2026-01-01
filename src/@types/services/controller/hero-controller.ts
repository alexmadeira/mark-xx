import type { TTimer } from '../utils/timer'

import { ZSchemaTechnology } from '@/services/schema/technology'

import { z } from 'zod/v4'

export const ZHeroTimeout = z.custom<TTimer>().nullish()
export const ZHeroControll = z.object({
  hero: z.number(),
  letter: z.number(),
})

export const ZHeroSettings = z.object({
  delay: z.number(),
  speed: z.number(),
  deletionSpeed: z.number(),
})

export const ZHeroContent = ZSchemaTechnology

export const ZHeroProps = z.object({
  ...ZHeroSettings.shape,
})

//
//
//
//

export type THeroTimeout = z.infer<typeof ZHeroTimeout>
export type THeroControll = z.infer<typeof ZHeroControll>

export type THeroContent = z.infer<typeof ZHeroContent>

export type THeroProps = z.infer<typeof ZHeroProps>
