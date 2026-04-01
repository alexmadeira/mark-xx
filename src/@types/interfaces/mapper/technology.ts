import type { TRawSchemaTechnology } from '@/services/schema/technology'
import type { TStoreFetcherTechnology } from '@/services/store/fetcher-technologies'

export interface ITechnologyMapper {
  toStore(raw: TRawSchemaTechnology): TStoreFetcherTechnology
}
