import type { TEPrismicAwardType } from '@/enums/prismic'
import type { TRawSchemaAward } from '@/services/schema/award'

import { ZEPrismicAwardType } from '@/enums/prismic'

import { faker } from '@faker-js/faker'
import _ from 'lodash'

export type TAwardRaw = {
  id: string
  uid: string
  data: {
    by: string
    name: string
    date: string
    type: TEPrismicAwardType
    description: string
  }
}

export function makeAwardRaw(overrides: Partial<TAwardRaw> = {}): TRawSchemaAward {
  return _.merge<TRawSchemaAward, Partial<TAwardRaw>>(
    {
      type: 'award',
      id: faker.string.uuid(),
      uid: faker.lorem.slug(),
      url: faker.internet.url(),
      href: faker.internet.url(),
      lang: faker.helpers.arrayElement(['en-us', 'pt-br']),
      tags: [faker.lorem.word()],
      slugs: [faker.lorem.slug()],
      linked_documents: [],
      alternate_languages: [],
      last_publication_date: faker.date.past().toISOString(),
      first_publication_date: faker.date.past().toISOString(),
      data: {
        by: faker.company.name(),
        name: faker.lorem.words(),
        date: faker.date.past().toISOString(),
        type: faker.helpers.enumValue(ZEPrismicAwardType.enum),
        description: faker.lorem.text(),
      },
    },
    overrides,
  )
}
