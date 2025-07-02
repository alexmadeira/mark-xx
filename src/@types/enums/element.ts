import { z } from 'zod/v4'

import { BASE_ELEMENT_KEY, ELEMENT_BLOCK } from '_SRV/constant/element'

export const ZEBaseElementKey = z.enum(BASE_ELEMENT_KEY)
export const ZEBlock = z.enum(ELEMENT_BLOCK)

//
//
//
//

export type TEBaseElementKey = z.infer<typeof ZEBaseElementKey>
export type TEBlock = z.infer<typeof ZEBlock>
