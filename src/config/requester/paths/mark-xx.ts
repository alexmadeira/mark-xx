import type { TApiRequesterPaths } from '@/services/api/api-requester'

import { ZSchemaAward } from '@/services/schema/award'
import { ZSchemaBrand } from '@/services/schema/brand'
import { ZSchemaPage } from '@/services/schema/page'
import { ZSchemaProject, ZSchemaProjectPage } from '@/services/schema/project'
import { ZSchemaTechnology } from '@/services/schema/technology'
import { ZSchemaUsageLanguage } from '@/services/schema/usage-language'

import z from 'zod'

export const markXXPaths = {
  'mark-xx:technologies': {
    method: 'get',
    path: '/mark-xx/technologies',
    schema: z.array(ZSchemaTechnology),
  },
  'mark-xx:projects': {
    method: 'get',
    path: '/mark-xx/projects',
    schema: z.array(ZSchemaProject),
  },
  'mark-xx:project': {
    method: 'get',
    path: '/mark-xx/project',
    schema: ZSchemaProjectPage,
  },
  'mark-xx:page': {
    method: 'get',
    path: '/mark-xx/page',
    schema: ZSchemaPage,
  },
  'mark-xx:awards': {
    method: 'get',
    path: '/mark-xx/awards',
    schema: z.array(ZSchemaAward),
  },
  'mark-xx:brands': {
    method: 'get',
    path: '/mark-xx/brands',
    schema: z.array(ZSchemaBrand),
  },
  'mark-xx:languages-usage': {
    method: 'get',
    path: '/mark-xx/languages-usage',
    schema: z.object({
      total: z.number(),
      languages: z.array(ZSchemaUsageLanguage),
    }),
  },
} as const satisfies TApiRequesterPaths
