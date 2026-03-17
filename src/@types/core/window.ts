import { z } from 'zod/v4'

export const ZCWindowEventKey = z.custom<keyof WindowEventMap>()
export const ZCWindowEvent = z.custom<WindowEventMap[keyof WindowEventMap]>()

//
//
//
//

export type TCWindowEventKey = z.infer<typeof ZCWindowEventKey>
export type TCWindowEvent = z.infer<typeof ZCWindowEvent>
