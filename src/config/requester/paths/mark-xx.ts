import type { TApiRequesterPaths } from '@/services/api/api-requester'

import { ZSchemaProject } from '@/services/schema/project'
import { ZSchemaTecnology } from '@/services/schema/tecnology'

import z from 'zod'

export const markXXPaths = {
  'mark-xx:tecnologies': {
    method: 'get',
    path: '/mark-xx/tecnologies',
    schema: z.array(ZSchemaTecnology),
  },
  'mark-xx:projects': {
    method: 'get',
    path: '/mark-xx/projects',
    schema: z.array(ZSchemaProject),
  },
} as const satisfies TApiRequesterPaths
