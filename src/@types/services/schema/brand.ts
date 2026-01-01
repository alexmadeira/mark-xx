import { ZPrismicDocumentBrand } from '@/prismic/mark-xx'

import { z } from 'zod/v4'

export const ZSchemaBrand = ZPrismicDocumentBrand

//
//
//
//

export type TSchemaBrand = z.infer<typeof ZSchemaBrand>
