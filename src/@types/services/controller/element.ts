import { ZUIElementClassName, ZUIElementCssVars, ZUIElementMeasure } from '@/config/ui/element'

import { z } from 'zod/v4'

export const ZElementCssVars = ZUIElementCssVars
export const ZElementMeasure = ZUIElementMeasure
export const ZElementClassName = ZUIElementClassName

export const ZElementCssVarsSettings = z.object({
  name: z.string(),
  global: z.boolean().default(true),
})

export const ZElementSettings = z.object({
  cssVars: ZElementCssVarsSettings,
})

export const ZElementOptions = z.object({
  cssVars: ZElementCssVarsSettings.partial().optional(),
})

export const ZElementProps = z.object({
  name: z.string(),
  measure: ZElementMeasure.optional(),
  className: ZElementClassName.optional(),
  options: ZElementOptions.optional(),
})

export const ZElement = z.object({
  name: z.string(),
  settings: ZElementSettings,
  measure: ZElementMeasure,
  className: ZElementClassName,
})

//
//
//
//

export type TElementCssVars = z.infer<typeof ZElementCssVars>
export type TElementMeasure = z.infer<typeof ZElementMeasure>
export type TElementClassName = z.infer<typeof ZElementClassName>
export type TElementSettings = z.infer<typeof ZElementSettings>
export type TElementOptions = z.infer<typeof ZElementOptions>

export type TElementProps = z.infer<typeof ZElementProps>
export type TElement = z.infer<typeof ZElement>
