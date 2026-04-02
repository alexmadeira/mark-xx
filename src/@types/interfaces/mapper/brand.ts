import type { TRawSchemaBrand } from '@/services/schema/brand'
import type { TStoreFetcherBrand } from '@/services/store/fetcher-brands'

export interface IBrandMapper {
  toStore(raw: TRawSchemaBrand): TStoreFetcherBrand
}
