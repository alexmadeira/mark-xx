import type { UseMeasureRect } from 'react-use/lib/useMeasure'

import { ZEBlock } from '@/enums/element'

import { z } from 'zod'

export const ZStoreElementData = z.record(ZEBlock, z.custom<UseMeasureRect>())
export const ZStoreElementActions = z.object({
  setBlock: z.function().args(ZEBlock, z.custom<Partial<UseMeasureRect>>()).returns(z.void()),
})

export const ZStoreElement = z.object({
  data: ZStoreElementData,
  actions: ZStoreElementActions,
})

//
//
//
//

export type TStoreElementData = z.infer<typeof ZStoreElementData>
export type TStoreElementActions = z.infer<typeof ZStoreElementActions>
export type TStoreElement = z.infer<typeof ZStoreElement>
