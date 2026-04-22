import type { TRawSchemaCompany } from '@/services/schema/company'
import type { TDeepPartial } from '@/utils/deep-partial'

import { faker } from '@faker-js/faker'
import _ from 'lodash'

import { makePrismicRootDocument } from '../prismic/make-prismic-document'

export type TCompanyRaw = {
  id: string
  uid: string
  data: {
    name: string
    role: string
    start_date: string | null
    end_date: string | null
    description: {
      type: string
      text: string
      spans: []
    }[]
  }
}

export function makeCompanyRaw(overrides: TDeepPartial<TCompanyRaw> = {}): TRawSchemaCompany {
  return _.merge<TRawSchemaCompany, TDeepPartial<TCompanyRaw>>(
    {
      ...makePrismicRootDocument({ type: 'company', id: overrides.id, uid: overrides.uid }),
      data: {
        name: faker.company.name(),
        role: faker.person.jobType(),
        start_date: null,
        end_date: null,
        description: [
          {
            type: 'paragraph',
            text: faker.lorem.paragraph(),
            spans: [],
          },
        ],
      },
    },
    overrides,
  )
}
