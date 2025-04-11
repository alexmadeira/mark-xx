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

//
//
//
//

export type THeroBannerProps = z.infer<typeof ZHeroBannerProps>
