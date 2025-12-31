import { ZPrismicAnyPageDocument } from '@/prismic/mark-xx'

import { z } from 'zod/v4'

export const ZSchemaPage = ZPrismicAnyPageDocument

//
//
//
//

export type TSchemaPage = z.infer<typeof ZSchemaPage>
