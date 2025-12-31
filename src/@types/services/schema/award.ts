import { ZPrismicDocumentAward } from '@/prismic/mark-xx'

import { z } from 'zod/v4'

export const ZSchemaAward = ZPrismicDocumentAward

//
//
//
//

export type TSchemaAward = z.infer<typeof ZSchemaAward>
