import type { TTimerCancel } from '../utils/timer'

import { ZSchemaTechnology } from '@/services/schema/technology'

import { z } from 'zod/v4'

export const ZHeroTimeout = z.custom<TTimerCancel>().nullish()
export const ZHeroControll = z.object({
  hero: z.number(),
  letter: z.number(),
})

export const ZHeroSettings = z.object({
  wait: z.number(),
  typingSpeed: z.number(),
  deletionSpeed: z.number(),
})

export const ZHeroContent = ZSchemaTechnology

//
//
//
//

export type THeroTimeout = z.infer<typeof ZHeroTimeout>
export type THeroControll = z.infer<typeof ZHeroControll>
export type THeroSettings = z.infer<typeof ZHeroSettings>

export type THeroContent = z.infer<typeof ZHeroContent>
