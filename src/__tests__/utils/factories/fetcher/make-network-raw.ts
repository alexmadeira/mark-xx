import { faker } from '@faker-js/faker'
import _ from 'lodash'

export type TNetworkRaw = {
  id: string
  tags: string[]
  data: {
    name: string
    path: string
    icon: string
    type: 'link' | 'copy'
  }
}

export function makeNetworkRaw(overrides: Partial<TNetworkRaw> = {}) {
  return _.merge(
    {
      id: faker.string.uuid(),
      tags: overrides.tags || faker.helpers.multiple(() => faker.lorem.word()),
      data: {
        name: faker.lorem.word(),
        path: faker.internet.email(),
        type: faker.helpers.arrayElement(['link', 'copy']),
        icon: faker.lorem.word(),
      },
    },
    overrides,
  )
}
