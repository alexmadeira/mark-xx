import { faker } from '@faker-js/faker'
import _ from 'lodash'

export type TBrandRaw = {
  id: string
  uid: string
  data: {
    name: string
    logo: string
  }
}

export function makeBrandRaw(overrides: Partial<TBrandRaw> = {}) {
  return _.merge(
    {
      id: faker.string.uuid(),
      uid: faker.lorem.slug(),
      data: {
        name: faker.company.name(),
        logo: faker.image.url(),
      },
    },
    overrides,
  )
}
