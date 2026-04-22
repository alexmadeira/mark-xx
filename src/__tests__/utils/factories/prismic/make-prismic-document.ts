import type { AlternateLanguage } from '@prismicio/client'

import { faker } from '@faker-js/faker'
import _ from 'lodash'

// type TypeEnum = 'company' | 'project' | 'technology'

export type TPrismicRootDocumentOverrides<TType> = {
  type: TType
  id?: string
  uid?: string
  tags?: string[]
}

export type TPrismicRootDocument<TType> = {
  type: TType
  id: string
  uid: string
  url: string | null
  href: string
  lang: string
  tags: string[]
  slugs: string[]
  linked_documents: unknown[]
  alternate_languages: AlternateLanguage<TType>[]
  last_publication_date: string
  first_publication_date: string
}

export type TPrismicRelationshipDocument<TType> = {
  link_type: 'Document'
  id: string
  uid: string
  url: string
  type: TType
  lang: string
  tags: string[]
}

export function makePrismicRootDocument<TType>(
  overrides: TPrismicRootDocumentOverrides<TType>,
): TPrismicRootDocument<TType> {
  return {
    type: overrides.type,
    id: overrides.id || faker.string.uuid(),
    uid: overrides.uid || faker.lorem.slug(),
    url: faker.internet.url(),
    href: faker.internet.url(),
    tags: overrides.tags || [faker.lorem.word()],
    lang: faker.helpers.arrayElement(['en-us', 'pt-br']),
    slugs: [],
    linked_documents: [],
    alternate_languages: [],
    last_publication_date: faker.date.past().toISOString(),
    first_publication_date: faker.date.past().toISOString(),
  }
}

export function makeRelationshipDocumentRaw<TType>(
  document: TPrismicRootDocument<TType>,
): TPrismicRelationshipDocument<TType> {
  return {
    link_type: 'Document' as const,
    id: document.id,
    uid: document.uid,
    url: document.url || faker.internet.url(),
    type: document.type,
    tags: document.tags,
    lang: document.lang,
  }
}
