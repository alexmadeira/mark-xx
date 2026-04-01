import type { TRawSchemaNetwork } from '@/services/schema/network'
import type { TStoreFetcherNetwork } from '@/services/store/fetcher-networks'

export interface INetworkMapper {
  toStore(raw: TRawSchemaNetwork): TStoreFetcherNetwork
}
