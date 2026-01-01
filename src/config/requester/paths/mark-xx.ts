import type { TRequesterPaths } from '@/services/builder/requester'

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
    schema: z.array(ZSchemaTechnology),
  },
  'mark-xx:projects': {
    method: 'get',
    schema: z.array(ZSchemaProject),
  },
  'mark-xx:project': {
    method: 'get',
    path: '/mark-xx/project',
    schema: ZSchemaProjectPage,
  },
  'mark-xx:page': {
    method: 'get',
    schema: ZSchemaPage,
  },
  'mark-xx:awards': {
    method: 'get',
    schema: z.array(ZSchemaAward),
  },
  'mark-xx:brands': {
    method: 'get',
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
} as const satisfies TRequesterPaths
