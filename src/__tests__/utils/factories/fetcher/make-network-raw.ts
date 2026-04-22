import type { TRawSchemaNetwork } from '@/services/schema/network'
import type { TDeepPartial } from '@/utils/deep-partial'

import { faker } from '@faker-js/faker'
import _ from 'lodash'

const networkIcons = ['email', 'linkedin', 'github', 'instagram'] as const
const networkTypes = ['link', 'copy'] as const

export type TNetworkRaw = {
  id: string
  tags: string[]
  data: {
    network_name: string
    network_path: string
    network_icon: (typeof networkIcons)[number]
    network_type: (typeof networkTypes)[number]
  }
}

export function makeNetworkRaw(overrides: TDeepPartial<TNetworkRaw> = {}): TRawSchemaNetwork {
  return _.merge<TRawSchemaNetwork, TDeepPartial<TNetworkRaw>>(
    {
      uid: null,
      type: 'social_network',
      id: faker.string.uuid(),
      url: faker.internet.url(),
      tags: [],
      href: faker.internet.url(),
      lang: faker.helpers.arrayElement(['en-us', 'pt-br']),
      slugs: [],
      linked_documents: [],
      alternate_languages: [],
      last_publication_date: faker.date.past().toISOString(),
      first_publication_date: faker.date.past().toISOString(),
      data: {
        network_name: faker.lorem.word(),
        network_type: faker.helpers.arrayElement(networkTypes),
        network_icon: faker.helpers.arrayElement(networkIcons),
        network_path: faker.helpers.arrayElement([faker.internet.url(), faker.internet.email()]),
      },
    },
    overrides,
  )
}
