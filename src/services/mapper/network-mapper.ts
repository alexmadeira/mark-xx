import type { TRawSchemaNetwork } from '@/services/schema/network'
import type { TStoreFetcherNetwork } from '@/services/store/fetcher-networks'

import _ from 'lodash'

export class NetworkMapper {
  public static toStore(raw: TRawSchemaNetwork): TStoreFetcherNetwork {
    return {
      id: raw.id,
      tags: raw.tags,
      name: _.get(raw, 'data.network_name', ''),
      path: _.get(raw, 'data.network_path', ''),
      type: _.get(raw, 'data.network_type'),
      icon: _.get(raw, 'data.network_icon', ''),
    }
  }
}
