import { ZETechnologyKey } from '@/enums/technology'

import { z } from 'zod'

export const ZHeroBannerTypingSpeed = z.object({
  type: z.literal('keyStrokeDelayInMs').default('keyStrokeDelayInMs'),
  value: z.number(),
})

export const ZHeroBannerProps = z.object({
  start: ZETechnologyKey,
  delay: z.coerce.number().positive(),
  speed: z.coerce.number().positive(),
  deletionSpeed: z.coerce.number().positive(),
})

export const ZHeroBanner = z.object({
  typingSequence: z.array(z.union([z.string(), z.number(), z.function().returns(z.void())])),
  speed: ZHeroBannerTypingSpeed,
  deletionSpeed: ZHeroBannerTypingSpeed,
})

//
//
//
//

export type THeroBannerProps = z.infer<typeof ZHeroBannerProps>
export type IHeroBanner = z.infer<typeof ZHeroBanner>
