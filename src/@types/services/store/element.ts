import { ZDataElement, ZDataElementClassName, ZDataElementMeasure } from '@/services/content-data/element'

import { z } from 'zod/v4'

export const ZStoreElementProps = ZDataElement
export const ZStoreElementDataMeasure = ZDataElementMeasure
export const ZStoreElementDataClassName = ZDataElementClassName

export const ZStoreElementData = z.record(z.string(), ZStoreElementProps)

export const ZStoreElementActions = z.object({
  addElement: z.custom<(name: string) => void>(),
  setMeasure: z.custom<(name: string, props: z.infer<typeof ZStoreElementDataMeasure>) => void>(),
  setClassName: z.custom<(name: string, props: z.infer<typeof ZStoreElementDataClassName>) => void>(),
})

export const ZStoreElement = z.object({
  data: ZStoreElementData,
  actions: ZStoreElementActions,
})

//
//
//
//

export type TStoreElementProps = z.infer<typeof ZStoreElementProps>
export type TStoreElementDataMeasure = z.infer<typeof ZStoreElementDataMeasure>
export type TStoreElementData = z.infer<typeof ZStoreElementData>
export type TStoreElementActions = z.infer<typeof ZStoreElementActions>
export type TStoreElement = z.infer<typeof ZStoreElement>
