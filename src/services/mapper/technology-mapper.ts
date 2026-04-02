import type { ITechnologyMapper } from '@/interfaces/mapper/technology'
import type { IResize } from '@/services/lib/image/resize'
import type { TRawSchemaTechnology } from '@/services/schema/technology'
import type { TStoreFetcherTechnology } from '@/services/store/fetcher-technologies'

import _ from 'lodash'

export class TechnologyMapper implements ITechnologyMapper {
  constructor(private readonly image: IResize) {
    _.bindAll(this, ['toStore'])
  }

  public toStore(raw: TRawSchemaTechnology): TStoreFetcherTechnology {
    const baseData: TStoreFetcherTechnology = {
      id: raw.id,
      name: _.get(raw, 'data.name', ''),
      color: _.get(raw, 'data.color', '#FFFFFF'),
      type: _.get(raw, 'data.type', _.get(raw, 'data.name', '')),
    }
    const extraData = {
      banner: this.image.resize(_.get(raw, 'data.banner.url')),
    }

    return _.omitBy({ ...baseData, ...extraData }, _.isUndefined) as TStoreFetcherTechnology
  }
}
