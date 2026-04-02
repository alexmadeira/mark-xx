import { faker } from '@faker-js/faker'
import _ from 'lodash'

export type TTechnologyRaw = {
  id: string
  data: {
    name: string
    type: string
    color: string
    banner?: string
  }
}

export function makeTechnologyRaw(overrides: Partial<TTechnologyRaw> = {}) {
  return _.merge(
    {
      id: faker.string.uuid(),
      data: {
        name: faker.lorem.words(2),
        type: faker.lorem.word(),
        color: faker.color.rgb(),
      },
    },
    overrides,
  )
}
