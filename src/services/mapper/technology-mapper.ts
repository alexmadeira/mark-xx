import type { TSchemaTechnology } from '@/services/schema/technology'
import type { TStoreFetcherTechnology } from '@/services/store/fetcher-technologies'

import { ZStoreFetcherTechnology } from '@/services/store/fetcher-technologies'

import _ from 'lodash'

export class TechnologyMapper {
  public static toStore(raw: TSchemaTechnology): TStoreFetcherTechnology {
    const baseData: TStoreFetcherTechnology = {
      id: raw.id,
      name: _.get(raw, 'data.name', ''),
      color: _.get(raw, 'data.color', '#FFFFFF'),
      type: _.get(raw, 'data.type', _.get(raw, 'data.name', '')),
    }
    const extraData = {
      banner: _.get(raw, 'data.banner.url'),
    }

    return ZStoreFetcherTechnology.parse(_.omitBy({ ...baseData, ...extraData }, _.isUndefined))
  }
}
