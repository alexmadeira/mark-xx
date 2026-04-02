import type { TMasonryContent } from '@/services/builder/masonry'
import type { TRawSchemaProject } from '@/services/schema/project'
import type { TStoreFetcherProject } from '@/services/store/fetcher-projects'

export interface IProjectMapper {
  toStore(raw: TRawSchemaProject): TStoreFetcherProject
  toMasonry(raw: TStoreFetcherProject): TMasonryContent<TStoreFetcherProject>
}
