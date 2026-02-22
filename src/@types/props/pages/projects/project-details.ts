import { ZSchemaProject } from '@/services/schema/project'

import { z } from 'zod/v4'

export const ZProjectProject = ZSchemaProject

export const ZProjectDetailsProps = z.intersection(ZProjectProject, z.object({ className: z.string().optional() }))
export const ZProjectDetailsContentProps = ZProjectProject

//
//
//
//

export type TProjectDetailsProps = z.infer<typeof ZProjectDetailsProps>
export type TProjectDetailsContentProps = z.infer<typeof ZProjectDetailsContentProps>
