import type { TRawSchemaGithubRepositoryLanguages } from '@/services/schema/github-repository-language'

import { faker } from '@faker-js/faker'
import _ from 'lodash'

export function makeRepositoryLanguageRaw(
  overrides: Partial<TRawSchemaGithubRepositoryLanguages> = {},
): TRawSchemaGithubRepositoryLanguages {
  return _.merge<TRawSchemaGithubRepositoryLanguages, Partial<TRawSchemaGithubRepositoryLanguages>>(
    {
      TypeScript: faker.number.int({ min: 1000, max: 8000 }),
      JavaScript: faker.number.int({ min: 500, max: 4000 }),
      CSS: faker.number.int({ min: 200, max: 2000 }),
    },
    overrides,
  )
}
