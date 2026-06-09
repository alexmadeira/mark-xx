import type { TPrismicDocumentProject } from '@/prismic/mark-xx'
import type { ProjectDocumentDataTechnologiesItem } from '@/prismic/mark-xx/types'
import type { TRawSchemaProject } from '@/services/schema/project'
import type { TDeepPartial } from '@/utils/deep-partial'
import type { GroupField } from '@prismicio/client'
import type { Simplify } from 'node_modules/@prismicio/client/dist/types/value/types'

import { faker } from '@faker-js/faker'
import _ from 'lodash'

import { makePrismicRootDocument, makeRelationshipDocumentRaw } from '../prismic/make-prismic-document'
import { makeCompanyRaw } from './make-company-raw'
import { makeTechnologyRaw } from './make-technology-raw'

const projectTeamSizes = ['1', '2 - 10', '10 - 50', '50 - 100', '+ 100'] as const

export type TProjectRelationship = { id: string; uid: string }
export type TProjectRaw = {
  id: string
  uid: string
  data: {
    name: string
    role: string
    content: string
    description: string
    start_date: string
    end_date: string
    team_size: (typeof projectTeamSizes)[number]
    logo_color: `#${string}`
    thumbnail_color: `#${string}`
    highlight: boolean
    tags: string[]
    logo: { url: string }
    banner: { url: string }
    thumbnail: { url: string }
    banner_name: string
    banner_class: string
    company: TProjectRelationship
    technologies: TProjectRelationship[]
  }
}

function makeProjectTechnologyGroup(technologies: TPrismicDocumentProject['relationship']['technologies']) {
  return technologies.map((technology) => ({
    technology: makeRelationshipDocumentRaw(technology),
  })) as GroupField<Simplify<ProjectDocumentDataTechnologiesItem>>
}

export function makeProjectRaw(overrides: TDeepPartial<TProjectRaw> = {}): TRawSchemaProject {
  const companyRelationship = makeCompanyRaw(overrides.data?.company)
  const technologiesRelationship = overrides.data?.technologies?.map((tech) => makeTechnologyRaw(tech)) || []

  technologiesRelationship.map(makeRelationshipDocumentRaw)
  return {
    ...makePrismicRootDocument({ type: 'project', id: overrides.id, uid: overrides.uid }),

    data: {
      name: overrides?.data?.name || faker.company.name(),
      role: overrides?.data?.role || faker.person.jobTitle(),
      date: faker.date.recent().toISOString().split('T')[0],
      content: [{ type: 'paragraph', text: overrides?.data?.content || faker.lorem.paragraph(), spans: [] }],
      highlight: overrides?.data?.highlight || faker.datatype.boolean(),
      team_size: overrides?.data?.team_size || faker.helpers.arrayElement(projectTeamSizes),
      logo_color: overrides?.data?.logo_color || `#${faker.color.rgb({ format: 'hex', casing: 'lower' }).slice(1)}`,
      banner_name: overrides?.data?.banner_name || faker.lorem.words(2),
      description: overrides?.data?.description || faker.lorem.sentence(),
      banner_class: overrides?.data?.banner_class || faker.lorem.slug(),
      thumbnail_color:
        overrides?.data?.thumbnail_color || `#${faker.color.rgb({ format: 'hex', casing: 'lower' }).slice(1)}`,
      end_date: overrides?.data?.end_date || faker.date.recent().toISOString().split('T')[0],
      start_date: overrides?.data?.start_date || faker.date.past().toISOString().split('T')[0],
      logo: { link_type: 'Web', url: overrides?.data?.logo?.url || faker.image.urlPicsumPhotos() },
      banner: { link_type: 'Web', url: overrides?.data?.banner?.url || faker.image.urlPicsumPhotos() },
      thumbnail: { link_type: 'Web', url: overrides?.data?.thumbnail?.url || faker.image.urlPicsumPhotos() },
      thumbnail_class: null,
      company: makeRelationshipDocumentRaw(companyRelationship),
      technologies: makeProjectTechnologyGroup(technologiesRelationship),
      body: [],
      blocks: [],
    },
    relationship: {
      company: companyRelationship,
      technologies: technologiesRelationship,
    },
  }
}
