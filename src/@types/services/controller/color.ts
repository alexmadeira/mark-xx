import { ZEColorDefaultKey } from '@/enums/controller/color'

import { z } from 'zod'

export const ZColor = z.string()
export const ZColors = z.object({
  dark: ZColor,
  light: ZColor,
  variations: z.array(ZColor),
})

export const ZColorProps = z.object({
  default: ZEColorDefaultKey.default('dark'),
  dark: ZColor.default('#000000'),
  light: ZColor.default('#FFFFFF'),
  variations: z.array(z.string()).optional(),
})

//
//
//
//

export type TColor = z.infer<typeof ZColor>
export type TColors = z.infer<typeof ZColors>

export type TColorProps = z.infer<typeof ZColorProps>
