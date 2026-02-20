import type { TRequesterPaths } from '@/services/builder/requester'

import { ZRawSchemaAward } from '@/services/schema/award'
import { ZRawSchemaBrand } from '@/services/schema/brand'
import { ZRawSchemaCompany } from '@/services/schema/company'
import { ZRawSchemaNetwork } from '@/services/schema/network'
import { ZRawSchemaPage } from '@/services/schema/page'
import { ZRawSchemaProject } from '@/services/schema/project'
import { ZRawSchemaTechnology } from '@/services/schema/technology'

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
    schema: ZRawSchemaProject,
  },
  'mark-xx:page': {
    method: 'get',
    schema: ZRawSchemaPage,
  },
  'mark-xx:awards': {
    method: 'get',
    schema: z.array(ZRawSchemaAward),
  },
  'mark-xx:networks': {
    method: 'get',
    schema: z.array(ZRawSchemaNetwork),
  },
  'mark-xx:brands': {
    method: 'get',
    schema: z.array(ZRawSchemaBrand),
  },
  'mark-xx:companies': {
    method: 'get',
    schema: z.array(ZRawSchemaCompany),
  },
} as const satisfies TRequesterPaths
