import { faker } from '@faker-js/faker'
import _ from 'lodash'

type TDeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? TDeepPartial<T[K]> : T[K]
}

export type TProjectRaw = {
  id: string
  uid: string
  data: {
    name: string
    role: string
    content: string
    description: string
    date: Date
    team_size: string
    highlight: boolean
    tags: string[]
  }
}

export function makeProjectRaw(overrides: TDeepPartial<TProjectRaw> = {}) {
  return _.merge(
    {
      id: faker.string.uuid(),
      uid: faker.lorem.slug(),
      data: {
        name: faker.company.name(),
        role: faker.person.jobTitle(),
        content: faker.lorem.paragraph(),
        description: faker.lorem.sentence(),
        date: faker.date.past(),
        team_size: String(faker.number.int({ min: 1, max: 15 })),
        highlight: faker.datatype.boolean(),
        tags: [faker.hacker.noun(), faker.hacker.verb()],
      },
    },
    overrides,
  )
}
