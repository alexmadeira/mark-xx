import { ZEPageBlockType } from '@/enums/page'
import { ZSchemaPageBlock } from '@/services/schema/page'

import { z } from 'zod/v4'

export const ZContentPreseterTemplates = z.partialRecord(ZEPageBlockType, z.string())

export const ZContentPreseterBuildBlockProps = ZSchemaPageBlock
export const ZContentPreseterRenderProps = z.array(ZSchemaPageBlock)

export const ZContentPreseterProps = z.object({
  templates: ZContentPreseterTemplates,
})

//
//
//

export type TContentPreseterTemplates = z.infer<typeof ZContentPreseterTemplates>

export type TContentPreseterBuildBlockProps = z.infer<typeof ZContentPreseterBuildBlockProps>
export type TContentPreseterRenderProps = z.infer<typeof ZContentPreseterRenderProps>

export type TContentPreseterProps = z.infer<typeof ZContentPreseterProps>
