import { ZEColorDefaultKey } from '@/enums/controller/color'

import { z } from 'zod'

export const ZColor = z.string()
export const ZColors = z.object({
  dark: ZColor,
  light: ZColor,
  variations: z.array(ZColor),
})

export const ZColorHex = z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/)
export const ZColorRGB = z
  .string()
  .regex(/^\s*(25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*(25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*(25[0-5]|2[0-4]\d|1?\d{1,2})\s*$/)
export const ZColorAlpha = z.number().min(0).max(1)

export const ZColorData = z.tuple([ZColor, ZColorAlpha.default(1)])

export const ZColorProps = z.object({
  default: ZEColorDefaultKey.default('dark'),
  dark: z.union([ZColor, ZColorData]).default('#000000'),
  light: z.union([ZColor, ZColorData]).default('#FFFFFF'),
  variations: z.array(z.string()).default([]),
})

//
//
//
//

export type TColorHex = z.infer<typeof ZColorHex>
export type TColorRGB = z.infer<typeof ZColorRGB>
export type TColorAlpha = z.infer<typeof ZColorAlpha>
export type TColor = z.infer<typeof ZColor>
export type TColors = z.infer<typeof ZColors>
export type TColorData = z.infer<typeof ZColorData>

export type TColorProps = z.infer<typeof ZColorProps>
