import type {
  TRawSchemaPage,
  TRawSchemaPageConfig,
  TSchemaPageConfig,
  TSchemaPageMetaConfig,
} from '@/services/schema/page.ts'
import type { TStoreFetcherPagesAnyData } from '@/services/store/fetcher-pages.ts'

import { asHTML } from '@prismicio/client'
import _ from 'lodash'

import { env } from '~/env'

export class PageMapper {
  private static configMeta(raw: TRawSchemaPageConfig): TSchemaPageMetaConfig {
    const rootTitle = _.get(raw, 'primary.seo_title')
    const rootDescription = _.get(raw, 'primary.seo_description')

    const openGraphImage = _.get(raw, 'primary.og_image.url')
    const openGraphTitle = _.get(raw, 'primary.og_title', rootTitle)
    const openGraphDescription = _.get(raw, 'primary.og_description', rootDescription)

    const twitterImage = _.get(raw, 'primary.twitter_image.url', openGraphImage)
    const twitterTitle = _.get(raw, 'primary.twitter_title', openGraphTitle)
    const twitterDescription = _.get(raw, 'primary.twitter_description', openGraphDescription)

    return {
      seo: {
        title: _.presentsContent(rootTitle),
        description: _.presentsContent(rootDescription),
      },
      twitter: {
        card: raw.primary.twitter_card,
        image: twitterImage,
        title: _.presentsContent(twitterTitle),
        description: _.presentsContent(twitterDescription),
      },
      openGraph: {
        image: openGraphImage,
        type: raw.primary.og_type,
        title: _.presentsContent(openGraphTitle),
        description: _.presentsContent(openGraphDescription),
      },
    }
  }

  public static toStore(raw: TRawSchemaPage): TStoreFetcherPagesAnyData {
    const baseData: TStoreFetcherPagesAnyData = {
      status: 'loading',
      id: raw.id,
      slug: raw.uid,
      title: _.presentsContent(_.get(raw, 'data.title', '')).replace(/\s+/g, '\u00A0'),
      quote: _.presentsContent(_.get(raw, 'data.quote', null)),
      subTitle: _.presentsContent(_.get(raw, 'data.sub_title')),
      description: _.presentsContent(asHTML(_.get(raw, 'data.description'))),
    }

    const extraData = {
      movie: _.get(raw, 'data.movie.url'),
      awardsTitle: _.get(raw, 'data.awards_title', ''),
      awardsSubtitle: _.presentsContent(asHTML(_.get(raw, 'data.awards_subtitle'))),
      languagesTitle: _.get(raw, 'data.languages_title', ''),
      languagesSubtitle: _.presentsContent(asHTML(_.get(raw, 'data.languages_subtitle'))),
      brandsTitle: _.get(raw, 'data.brands_title', ''),
      brandsSubtitle: _.presentsContent(asHTML(_.get(raw, 'data.brands_subtitle'))),
    }

    return _.omitBy({ ...baseData, ...extraData }, _.isUndefined) as TStoreFetcherPagesAnyData
  }

  public static config(raw: TRawSchemaPageConfig[]): TSchemaPageConfig {
    const [rawConfig] = raw.filter((slice) => slice.slice_type === 'page_config')
    if (!rawConfig) throw new Error('Page config slice not found')

    const path = _.get(rawConfig, 'primary.seo_url')
    if (!path) throw new Error('Page config path is missing')

    return {
      key: `/${_.trimStart(path, '/')}`,
      canonical: new URL(path, env.VITE_ROOT_URL).toString(),
      meta: PageMapper.configMeta(rawConfig),
      background: _.get(rawConfig, 'primary.background_color', '#FFFFFF'),
    }
  }
}
