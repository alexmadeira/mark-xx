import type { AboutDocumentDataBodyPageConfigSlice } from '@/prismic/mark-xx/types'
import type { TRawSchemaPage } from '@/services/schema/page'
import type { TDeepPartial } from '@/utils/deep-partial'

import { faker } from '@faker-js/faker'
import _ from 'lodash'

import { makePrismicRootDocument } from '../prismic/make-prismic-document'

type TMakePageRichText = {
  type: 'paragraph'
  text: string
  spans: []
}

export type TPageConfigSliceOverrides = {
  id: string
  primary: {
    seo_url: string
    seo_title: string
    seo_description: string
    background_color: `#${string}`
    og_type: 'website' | 'article' | 'product' | 'profile' | 'video.movie'
    og_title: string
    og_description: string
    og_image: { url: string }
    twitter_card: 'summary_large_image' | 'summary' | 'player' | 'app'
    twitter_title: string
    twitter_description: string
    twitter_image: { url: string }
  }
}
export type TPageRawOverrides = {
  id: string
  uid: string
  tags: string[]
  data: {
    title: string
    quote: string
    sub_title: string
    movie: { url: string }
    awards_title: string
    languages_title: string
    brands_title: string
    brands_subtitle: string
    description: TMakePageRichText[]
    awards_subtitle: TMakePageRichText[]
    languages_subtitle: TMakePageRichText[]
    body: TPageConfigSliceOverrides[]
  }
}

function makePageConfigSlice(
  overrides: TDeepPartial<TPageConfigSliceOverrides> = {},
): AboutDocumentDataBodyPageConfigSlice {
  return _.merge<AboutDocumentDataBodyPageConfigSlice, TDeepPartial<TPageConfigSliceOverrides>>(
    {
      slice_type: 'page_config',
      slice_label: null,
      id: faker.string.uuid(),
      primary: {
        seo_url: `/${faker.lorem.slug()}`,
        seo_title: faker.lorem.words(4),
        seo_description: faker.lorem.sentence(),
        background_color: `#${faker.color.rgb({ format: 'hex', casing: 'lower' }).slice(1)}`,
        og_type: 'website',
        og_title: faker.lorem.words(4),
        og_description: faker.lorem.sentence(),
        og_image: { link_type: 'Web', url: faker.internet.url() },
        twitter_card: 'summary_large_image',
        twitter_title: faker.lorem.words(4),
        twitter_description: faker.lorem.sentence(),
        twitter_image: { link_type: 'Web', url: faker.internet.url() },
      },
      items: [],
    },
    overrides,
  )
}

export function makePageRaw(overrides: TDeepPartial<TPageRawOverrides> = {}): TRawSchemaPage {
  return _.merge<TRawSchemaPage, TDeepPartial<TPageRawOverrides>>(
    {
      ...makePrismicRootDocument({ type: 'about', id: overrides.id, uid: overrides.uid }),
      data: {
        title: faker.lorem.words(3),
        description: [{ type: 'paragraph', text: faker.lorem.sentence(), spans: [] }],
        quote: null,
        sub_title: null,
        movie: { link_type: 'Any' },
        awards_title: faker.lorem.words(2),
        awards_subtitle: [],
        languages_title: faker.lorem.words(2),
        languages_subtitle: [],
        brands_title: faker.lorem.words(2),
        brands_subtitle: [],
        body: [makePageConfigSlice()],
      },
    },
    overrides,
  )
}
