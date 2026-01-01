import type { TRequesterPaths } from '@/services/builder/requester'

import { ZRawSchemaAward } from '@/services/schema/award'
import { ZRawSchemaBrand } from '@/services/schema/brand'
import { ZRawSchemaPage } from '@/services/schema/page'
import { ZRawSchemaProject, ZRawSchemaProjectPage } from '@/services/schema/project'
import { ZRawSchemaTechnology } from '@/services/schema/technology'
import { ZRawSchemaUsageLanguage } from '@/services/schema/usage-language'

import z from 'zod'

export const markXXPaths = {
  'mark-xx:technologies': {
    method: 'get',
    schema: z.array(ZRawSchemaTechnology),
  },
  'mark-xx:projects': {
    method: 'get',
    schema: z.array(ZRawSchemaProject),
  },
  'mark-xx:project': {
    method: 'get',
    path: '/mark-xx/project',
    schema: ZRawSchemaProjectPage,
  },
  'mark-xx:page': {
    method: 'get',
    schema: ZRawSchemaPage,
  },
  'mark-xx:awards': {
    method: 'get',
    schema: z.array(ZRawSchemaAward),
  },
  'mark-xx:brands': {
    method: 'get',
    schema: z.array(ZRawSchemaBrand),
  },
  'mark-xx:languages-usage': {
    method: 'get',
    path: '/mark-xx/languages-usage',
    schema: z.object({
      total: z.number(),
      languages: z.array(ZRawSchemaUsageLanguage),
    }),
  },
} as const satisfies TRequesterPaths
