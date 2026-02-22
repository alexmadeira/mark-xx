import type { TRawSchemaTechnology } from '@/services/schema/technology'
import type { TStoreFetcherTechnology } from '@/services/store/fetcher-technologies'

import _ from 'lodash'

import { imageCloudinary } from '_SRV/lib/image'

export class TechnologyMapper {
  private static readonly cloudinaryImage = imageCloudinary()

  public static toStore(raw: TRawSchemaTechnology): TStoreFetcherTechnology {
    const baseData: TStoreFetcherTechnology = {
      id: raw.id,
      name: _.get(raw, 'data.name', ''),
      color: _.get(raw, 'data.color', '#FFFFFF'),
      type: _.get(raw, 'data.type', _.get(raw, 'data.name', '')),
    }
    const extraData = {
      banner: TechnologyMapper.cloudinaryImage.resize(_.get(raw, 'data.banner.url')),
    }

    return _.omitBy({ ...baseData, ...extraData }, _.isUndefined) as TStoreFetcherTechnology
  }
}
