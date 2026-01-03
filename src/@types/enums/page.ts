import { z } from 'zod/v4'

import { PAGE_BACKGROUND_TYPES, PAGE_OPEN_GRAPH_TYPES, PAGE_STATUS, PAGE_TWITTER_CARD_TYPES } from '_SRV/constant/page'

export const ZEPageStatus = z.enum(PAGE_STATUS)
export const ZEPageOpenGraphType = z.enum(PAGE_OPEN_GRAPH_TYPES)
export const ZEPageBackgroundType = z.enum(PAGE_BACKGROUND_TYPES)
export const ZEPageTwitterCardType = z.enum(PAGE_TWITTER_CARD_TYPES)

//
//
//

export type TEPageStatus = z.infer<typeof ZEPageStatus>
export type TEPageOpenGraphType = z.infer<typeof ZEPageOpenGraphType>
export type TEPageBackgroundType = z.infer<typeof ZEPageBackgroundType>
export type TEPageTwitterCardType = z.infer<typeof ZEPageTwitterCardType>
