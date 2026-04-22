import type { TRawSchemaBrand } from '@/services/schema/brand'
import type { TDeepPartial } from '@/utils/deep-partial'

import { faker } from '@faker-js/faker'
import _ from 'lodash'

export type TBrandRaw = {
  id: string
  uid: string
  data: {
    name: string
    logo: {
      url: string
    }
  }
}

export function makeBrandRaw(overrides: TDeepPartial<TBrandRaw> = {}): TRawSchemaBrand {
  return _.merge<TRawSchemaBrand, TDeepPartial<TBrandRaw>>(
    {
      type: 'brand',
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
        name: faker.company.name(),
        logo: {
          url: faker.internet.url(),
          alt: null,
          copyright: null,
          edit: {
            background: `#${faker.color.rgb({ format: 'hex', casing: 'lower' }).slice(1)}`,
            x: faker.number.int({ min: 0, max: 100 }),
            y: faker.number.int({ min: 0, max: 100 }),
            zoom: faker.number.float({ min: 0.5, max: 2 }),
          },
          dimensions: {
            width: faker.number.int({ min: 100, max: 1000 }),
            height: faker.number.int({ min: 100, max: 1000 }),
          },
          id: faker.string.uuid(),
        },
      },
    },
    overrides,
  )
}
