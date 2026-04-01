import type { TRawSchemaAward } from '@/services/schema/award'
import type { TStoreFetcherAward } from '@/services/store/fetcher-awards'

export interface IAwardMapper {
  toStore(raw: TRawSchemaAward): TStoreFetcherAward
}
