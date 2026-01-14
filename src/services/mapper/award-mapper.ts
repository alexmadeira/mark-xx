import type { TRawSchemaAward } from '@/services/schema/award'
import type { TStoreFetcherAward } from '@/services/store/fetcher-awards'

import _ from 'lodash'

import { AwardType } from '_SRV/parser/award'

export class AwardMapper {
  public static toStore(raw: TRawSchemaAward): TStoreFetcherAward {
    return {
      id: raw.id,
      slug: raw.uid,
      by: _.get(raw, 'data.by'),
      name: _.get(raw, 'data.name', ''),
      date: new Date(_.get(raw, 'data.date', '')),
      type: new AwardType(_.get(raw, 'data.type', null)),
      description: _.presentsContent(_.get(raw, 'data.description')),
    }
  }
}
