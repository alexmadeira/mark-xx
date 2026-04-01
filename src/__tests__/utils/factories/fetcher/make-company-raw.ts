import { faker } from '@faker-js/faker'
import _ from 'lodash'

export type TCompanyRaw = {
  id: string
  uid: string
  data: {
    name: string
    role: string
    description: string
    date: {
      end?: Date
      start: Date
    }
  }
}

export function makeCompanyRaw(overrides: Partial<TCompanyRaw> = {}) {
  return _.merge(
    {
      id: faker.string.uuid(),
      uid: faker.lorem.slug(),
      data: {
        name: faker.company.name(),
        role: faker.person.jobType(),
        description: faker.lorem.text(),
        date: {
          start: faker.date.past({ years: _.random(1, 6) }),
        },
      },
    },
    overrides,
  )
}
