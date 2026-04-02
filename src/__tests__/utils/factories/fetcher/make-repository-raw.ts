import type { Nullish } from '@/utils/nullish'

import { faker } from '@faker-js/faker'
import _ from 'lodash'

export type TRepositoryRaw = {
  id: string
  name: string
  size: number
  owner: string
  private: boolean
  language: Nullish<string>
  pushedAt?: Date
  createdAt?: Date
  updatedAt?: Date
}

export function makeRepositoryRaw(overrides: Partial<TRepositoryRaw> = {}) {
  return _.merge(
    {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      size: faker.number.int({ min: 5000, max: 20000 }),
      owner: faker.internet.username(),
      private: faker.datatype.boolean(),
      language: faker.lorem.word(),
      pushedAt: faker.date.past(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
    overrides,
  )
}
