import type { TSchemaPage } from '@/services/schema/page.ts'
import type { TStoreFetcherPagesPageProperties } from '@/services/store/fetcher-pages.ts'

import { marked } from 'marked'
import mustache from 'mustache'

import { contentPreseterConfig } from '_SRV/preseter/content-preseter-config.ts'

export class PageMapper {
  public static toStore(raw: TSchemaPage): TStoreFetcherPagesPageProperties {
    return {
      id: raw.properties.id,
      name: raw.properties.name.replace(/\s+/g, '\u00A0'),
      slug: raw.properties.slug,
      subTitle: raw.properties.subTitle,
      content: mustache.render(marked.parse(raw.content, { async: false }), contentPreseterConfig),
      movie: String(raw.properties.custom.movie),
    }
  }
}
