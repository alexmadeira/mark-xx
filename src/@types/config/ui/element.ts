import { z } from 'zod/v4'

export const ZUIElementMeasure = z.object({
  x: z.number().optional(),
  y: z.number().optional(),
  top: z.number().optional(),
  left: z.number().optional(),
  right: z.number().optional(),
  width: z.number().optional(),
  bottom: z.number().optional(),
  height: z.number().optional(),
})
export const ZUIElementClassName = z.string()
export const ZUIElementCssVars = z.record(z.string(), z.string())

export const ZUIElement = z.object({
  measure: ZUIElementMeasure,
  cssVars: ZUIElementCssVars,
  className: ZUIElementClassName,
})

//
//
//
//

export type TUIElementMeasure = z.infer<typeof ZUIElementMeasure>
export type TUIElementCssVars = z.infer<typeof ZUIElementCssVars>
export type TUIElement = z.infer<typeof ZUIElement>
