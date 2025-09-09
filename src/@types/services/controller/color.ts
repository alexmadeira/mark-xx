import type { MotionValue, ValueTransition } from 'motion'

import { z } from 'zod/v4'

export const ZColor = z.string()
export const ZColors = z.object({
  dark: ZColor,
  light: ZColor,
  variations: z.array(ZColor),
})
export const ZColorMotionColor = z.custom<MotionValue<z.infer<typeof ZColor>>>()
export const ZColorMotionColors = z.map(z.string(), ZColorMotionColor)
export const ZColorCssVars = z.record(z.string(), z.string())

export const ZColorsBetterContrastResult = z
  .object({
    color: ZColor,
  })
  .and(z.record(z.string(), z.string()))

export const ZColorProps = z.object({
  default: ZColor.default('#000000'),
  dark: ZColor.default('#000000'),
  light: ZColor.default('#FFFFFF'),
  variations: z.array(z.string()).optional(),
  transition: z.custom<ValueTransition>().optional(),
})

//
//
//
//

export type TColor = z.infer<typeof ZColor>
export type TColors = z.infer<typeof ZColors>

export type TColorMotionColor = z.infer<typeof ZColorMotionColor>
export type TColorMotionColors = z.infer<typeof ZColorMotionColors>

export type TColorCssVars = z.infer<typeof ZColorCssVars>

export type TColorsBetterContrastResult = z.infer<typeof ZColorsBetterContrastResult>

export type TColorProps = z.infer<typeof ZColorProps>
