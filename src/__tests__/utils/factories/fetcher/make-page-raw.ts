import { faker } from '@faker-js/faker'
import _ from 'lodash'

export type TPageRaw = {
  id: string
  uid: string
  data: {
    title: string
    body: Array<{
      slice_type: string
      primary: {
        seo_url: string
        seo_title: string
        seo_description: string
      }
    }>
  }
}

export function makePageRaw(overrides: Partial<TPageRaw> = {}) {
  return _.merge(
    {
      id: faker.string.uuid(),
      uid: faker.lorem.slug(),
      data: {
        title: faker.lorem.words(3),
        body: [
          {
            slice_type: 'page_config',
            primary: {
              seo_url: `/${faker.lorem.slug()}`,
              seo_title: faker.lorem.words(4),
              seo_description: faker.lorem.sentence(),
            },
          },
        ],
      },
    },
    overrides,
  )
}
