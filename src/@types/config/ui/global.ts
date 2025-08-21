import type { Variant } from 'motion/react'

import { z } from 'zod/v4'

export const ZUIMotionVariant = z.custom<Variant>()
export const ZUIMotionVariants = z.object({
  initial: ZUIMotionVariant,
  animate: ZUIMotionVariant,
  exit: ZUIMotionVariant,
})

export const ZUIMotion = z.object({
  variants: ZUIMotionVariants,
  exit: z.string().default('exit'),
  initial: z.string().default('initial'),
  animate: z.string().default('animate'),
})

//
//
//
//

export type TUIMotionVariant = z.infer<typeof ZUIMotionVariant>
export type TUIMotionVariants = z.infer<typeof ZUIMotionVariants>
export type TUIMotion = z.infer<typeof ZUIMotion>
