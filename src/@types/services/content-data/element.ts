import { z } from 'zod/v4'

export const ZDataElementMeasure = z.object({
  x: z.number().optional(),
  y: z.number().optional(),
  top: z.number().optional(),
  left: z.number().optional(),
  right: z.number().optional(),
  width: z.number().optional(),
  bottom: z.number().optional(),
  height: z.number().optional(),
})
export const ZDataElementCssVars = z.record(z.string(), z.string())
export const ZDataElement = z.object({
  measure: ZDataElementMeasure,
  cssVars: ZDataElementCssVars,
})

//
//
//
//

export type TDataElementMeasure = z.infer<typeof ZDataElementMeasure>
export type TDataElementCssVars = z.infer<typeof ZDataElementCssVars>
export type TDataElement = z.infer<typeof ZDataElement>
