import { ZPrismicDocumentTechnology } from '@/prismic/mark-xx'

import { z } from 'zod/v4'

export const ZSchemaTechnology = ZPrismicDocumentTechnology

//
//
//
//

export type TSchemaTechnology = z.infer<typeof ZSchemaTechnology>
