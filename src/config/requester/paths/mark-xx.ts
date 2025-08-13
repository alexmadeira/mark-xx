import type { TApiRequesterPaths } from '@/services/api/api-requester'

import { ZSchemaPage } from '@/services/schema/page'
import { ZSchemaProject } from '@/services/schema/project'
import { ZSchemaTecnology } from '@/services/schema/tecnology'

import z from 'zod'

export const markXXPaths = {
  'mark-xx:technologies': {
    method: 'get',
    path: '/mark-xx/technologies',
    schema: z.array(ZSchemaTecnology),
  },
  'mark-xx:projects': {
    method: 'get',
    path: '/mark-xx/projects',
    schema: z.array(ZSchemaProject),
  },
  'mark-xx:page': {
    method: 'get',
    path: '/mark-xx/page',
    schema: ZSchemaPage,
  },
} as const satisfies TApiRequesterPaths
