import { z } from 'zod/v4'

export const ZStoreMousePosition = z.object({
  x: z.number(),
  y: z.number(),
})

export const ZStoreMouseData = z.object({
  document: ZStoreMousePosition,
  elements: z.record(z.string(), ZStoreMousePosition),
})

export const ZStoreMouseActions = z.object({
  setDocumentPosition: z.custom<(position: z.infer<typeof ZStoreMousePosition>) => void>(),
  setElementPosition: z.custom<(name: string, position: z.infer<typeof ZStoreMousePosition>) => void>(),
})

export const ZStoreMouse = z.object({
  data: ZStoreMouseData,
  actions: ZStoreMouseActions,
})

//
//
//
//

export type TStoreMousePosition = z.infer<typeof ZStoreMousePosition>
export type TStoreMouseData = z.infer<typeof ZStoreMouseData>
export type TStoreMouseActions = z.infer<typeof ZStoreMouseActions>
export type TStoreMouse = z.infer<typeof ZStoreMouse>
