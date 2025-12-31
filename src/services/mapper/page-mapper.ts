import type { TSchemaPage } from '@/services/schema/page.ts'
import type { TStoreFetcherPagesAnyData } from '@/services/store/fetcher-pages.ts'

import { asHTML } from '@prismicio/client'
import _ from 'lodash'

export class PageMapper {
  public static toStore(raw: TSchemaPage): TStoreFetcherPagesAnyData {
    const baseData: TStoreFetcherPagesAnyData = {
      status: 'loading',
      id: raw.id,
      slug: raw.uid,
      title: _.presentsContent(_.get(raw, 'data.title', '')).replace(/\s+/g, '\u00A0'),
      color: _.get(raw, 'data.color', '#FFFFFF'),
      description: _.presentsContent(asHTML(_.get(raw, 'data.description'))),
      subTitle: _.presentsContent(_.get(raw, 'data.sub_title')),
    }
    const extraData = {
      movie: _.get(raw, 'data.movie.url'),
    }

    return _.omitBy({ ...baseData, ...extraData }, _.isUndefined) as TStoreFetcherPagesAnyData
  }
}
