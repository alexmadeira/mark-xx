import type { TStoreFetcherProject } from '@/services/store/fetcher-projects'
import type { TDeepPartial } from '@/utils/deep-partial'

import { faker } from '@faker-js/faker'
import _ from 'lodash'

export function makeProjectStoreData(overrides: TDeepPartial<TStoreFetcherProject> = {}): TStoreFetcherProject {
  return _.merge<TStoreFetcherProject, TDeepPartial<TStoreFetcherProject>>(
    {
      id: faker.string.uuid(),
      slug: faker.lorem.slug(),
      name: faker.company.name(),
      role: faker.person.jobTitle(),
      content: faker.lorem.paragraph(),
      description: faker.lorem.sentence(),
      date: faker.date.recent(),
      tags: faker.lorem.words(3).split(' '),
      teamSize: faker.helpers.arrayElement(['1', '2 - 10', '10 - 50', '50 - 100', '+ 100']),
      highlight: faker.datatype.boolean(),
      status: 'loaded',
      timeline: {
        start: faker.date.past(),
        end: faker.date.recent(),
      },
      thumbnailColor: `#${faker.color.rgb({ format: 'hex', casing: 'lower' }).slice(1)}`,
      logoColor: `#${faker.color.rgb({ format: 'hex', casing: 'lower' }).slice(1)}`,
      bannerName: faker.lorem.words(2),
      bannerClass: faker.lorem.slug(),
      thumbnailClass: faker.lorem.slug(),
      company: {
        id: faker.string.uuid(),
        slug: faker.lorem.slug(),
        name: faker.company.name(),
        role: faker.person.jobType(),
        start: faker.date.past(),
        end: faker.date.recent(),
        description: faker.lorem.sentence(),
      },
      contents: {},
      logo: {
        blur: faker.image.urlPicsumPhotos(),
        original: faker.image.urlPicsumPhotos(),
      },
      banner: {
        blur: faker.image.urlPicsumPhotos(),
        original: faker.image.urlPicsumPhotos(),
      },
      thumbnail: {
        blur: faker.image.urlPicsumPhotos(),
        original: faker.image.urlPicsumPhotos(),
      },
      technologies: [],
    },
    overrides,
  )
}
