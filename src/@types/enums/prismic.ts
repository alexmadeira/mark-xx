import { z } from 'zod/v4'

import { PRISMIC_AWARD_TYPES, PRISMIC_PAGE_TYPES, PRISMIC_RETURN_TYPES } from '_SRV/constant/prismic'

export const ZEPrismicPageType = z.enum(PRISMIC_PAGE_TYPES)
export const ZEPrismicAwardType = z.enum(PRISMIC_AWARD_TYPES)
export const ZEPrismicReturnType = z.enum(PRISMIC_RETURN_TYPES)

//
//
//
//

export type TEPrismicPageType = z.infer<typeof ZEPrismicPageType>
export type TEPrismicAwardType = z.infer<typeof ZEPrismicAwardType>
export type TEPrismicReturnType = z.infer<typeof ZEPrismicReturnType>
