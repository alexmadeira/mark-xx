import { ZSchemaProject } from '@/services/schema/project'

import { z } from 'zod/v4'

export const ZProjectDetailsProps = z.intersection(ZSchemaProject, z.object({ className: z.string().optional() }))
export const ZProjectDetailsContentProps = ZSchemaProject

//
//
//
//

export type TProjectDetailsProps = z.infer<typeof ZProjectDetailsProps>
export type TProjectDetailsContentProps = z.infer<typeof ZProjectDetailsContentProps>
