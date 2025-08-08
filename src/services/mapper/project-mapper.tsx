import type { TMasonryContent } from '@/services/builder/masonry'
import type { TSchemaProject } from '@/services/schema/project'

export class ProjectMapper {
  protected constructor() {}

  public static toMasonry(raw: TSchemaProject): TMasonryContent {
    return {
      className: 'bg-black',
      link: `/project/${raw.slug}`,
      color: raw.color,
      metaData: raw,
    }
  }
}
