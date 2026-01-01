import type { TRawSchemaBrand } from '@/services/schema/brand'
import type { TStoreFetcherBrand } from '@/services/store/fetcher-brands'

import _ from 'lodash'

export class BrandMapper {
  public static toStore(raw: TRawSchemaBrand): TStoreFetcherBrand {
    return {
      id: raw.id,
      slug: raw.uid,
      name: _.get(raw, 'data.name', ''),
      logo: _.get(raw, 'data.logo.url', ''),
    }
  }
}
