import type { TRawSchemaPage, TRawSchemaPageConfig, TSchemaPageConfig } from '@/services/schema/page.ts'
import type { TStoreFetcherPagesAnyData } from '@/services/store/fetcher-pages.ts'

export interface IPageMapper {
  toStore(raw: TRawSchemaPage): TStoreFetcherPagesAnyData
  config(raw: TRawSchemaPageConfig[]): TSchemaPageConfig
}
