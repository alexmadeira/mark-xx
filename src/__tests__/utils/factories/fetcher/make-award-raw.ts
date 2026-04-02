import type { TEPrismicAwardType } from '@/enums/prismic'

import { ZEPrismicAwardType } from '@/enums/prismic'

import { faker } from '@faker-js/faker'
import _ from 'lodash'

export type TAwardRaw = {
  id: string
  uid: string
  data: {
    by: string
    name: string
    date: Date
    type: TEPrismicAwardType
    description: string
  }
}

export function makeAwardRaw(overrides: Partial<TAwardRaw> = {}) {
  return _.merge(
    {
      id: faker.string.uuid(),
      uid: faker.lorem.slug(),
      data: {
        by: faker.company.name(),
        name: faker.lorem.words(),
        date: faker.date.past(),
        type: faker.helpers.enumValue(ZEPrismicAwardType.enum),
        description: faker.lorem.text(),
      },
    },
    overrides,
  )
}
