import { faker } from '@faker-js/faker'
import _ from 'lodash'

export type TPreFetcherRaw = {
  id: string
  name: string
  tags: string[]
}

export function makePreFetcherRaw(overrides: Partial<TPreFetcherRaw> = {}) {
  return _.merge(
    {
      id: faker.string.uuid(),
      name: `prefetch:${faker.lorem.slug()}`,
      tags: [faker.lorem.word()],
    },
    overrides,
  )
}
