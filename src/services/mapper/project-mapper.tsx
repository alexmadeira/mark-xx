import type { TMasonryContent } from '@/services/builder/masonry'
import type { TSchemaProject } from '@/services/schema/project'
import type { TStoreFetcherProjectsProjectProperties } from '@/services/store/fetcher-projects.ts'

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

  public static toStore(raw: TSchemaProject): TStoreFetcherProjectsProjectProperties {
    return {
      id: raw.id,
      name: raw.name,
      slug: raw.slug,
      role: raw.role,
      color: raw.color,
      company: raw.company,
      teamSize: raw.teamSize,
      bannerSrc: raw.bannerSrc,
      highlight: raw.highlight,
      bannerName: raw.bannerName,
      description: raw.description,
      bannerClass: raw.bannerClass,
      tags: raw.tags.map((tag) => tag.name),
      date: raw.date.start,
      timeline: raw.timeline,
      technologies: raw.technologies.map((tech) => tech.name),
    }
  }
}
