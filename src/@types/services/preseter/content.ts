import { ZSchemaPageContent } from '@/services/schema/page'

import { z } from 'zod/v4'

export const ZContentPreseterRenderProps = ZSchemaPageContent

export const ZContentPreseterProps = z.object({})

//
//
//

export type TContentPreseterRenderProps = z.infer<typeof ZContentPreseterRenderProps>

export type TContentPreseterProps = z.infer<typeof ZContentPreseterProps>
