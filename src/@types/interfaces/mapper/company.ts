import type { TRawSchemaCompany } from '@/services/schema/company'
import type { TStoreFetcherCompany } from '@/services/store/fetcher-companies'

export interface ICompanyMapper {
  toStore(raw: TRawSchemaCompany): TStoreFetcherCompany
}
