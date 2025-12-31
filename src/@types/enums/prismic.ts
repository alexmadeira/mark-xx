import { z } from 'zod/v4'

import { PRISMIC_PAGE_TYPES } from '_SRV/constant/prismic'

export const ZEPrismicPageType = z.enum(PRISMIC_PAGE_TYPES)

//
//
//
//

export type TEPrismicPageType = z.infer<typeof ZEPrismicPageType>
