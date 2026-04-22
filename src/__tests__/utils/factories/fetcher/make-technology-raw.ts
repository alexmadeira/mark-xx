import type { TRawSchemaTechnology } from '@/services/schema/technology'
import type { TDeepPartial } from '@/utils/deep-partial'

import { faker } from '@faker-js/faker'
import _ from 'lodash'

import { makePrismicRootDocument } from '../prismic/make-prismic-document'

export type TTechnologyRaw = {
  id: string
  uid: string
  data: {
    name: string
    type: string
    color: `#${string}`
    usage_started: string
    banner: {
      link_type: 'Any' | 'Document' | 'Media' | 'Web'
      url: string
    }
  }
}

export function makeTechnologyRaw(overrides: TDeepPartial<TTechnologyRaw> = {}): TRawSchemaTechnology {
  return _.merge<TRawSchemaTechnology, TDeepPartial<TTechnologyRaw>>(
    {
      ...makePrismicRootDocument({ type: 'technology', id: overrides.id, uid: overrides.uid }),
      data: {
        name: faker.lorem.word(),
        type: faker.lorem.word(),
        color: `#${faker.color.rgb({ format: 'hex', casing: 'lower' }).slice(1)}`,
        usage_started: faker.date.past().toISOString().split('T')[0],
        banner: {
          link_type: 'Any',
        },
      },
    },
    overrides,
  )
}
