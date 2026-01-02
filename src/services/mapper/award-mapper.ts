import type { TRawSchemaAward } from '@/services/schema/award'
import type { TStoreFetcherAward } from '@/services/store/fetcher-awards'

import _ from 'lodash'

export class AwardMapper {
  public static toStore(raw: TRawSchemaAward): TStoreFetcherAward {
    return {
      id: raw.id,
      name: _.get(raw, 'data.name', ''),
      slug: raw.uid,
      date: new Date(_.get(raw, 'data.date', '')),
      description: _.presentsContent(_.get(raw, 'data.description')),
    }
  }
}
