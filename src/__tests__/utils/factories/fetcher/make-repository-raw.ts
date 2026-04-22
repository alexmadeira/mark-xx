import type { TRawSchemaGithubRepository } from '@/services/schema/github-repository'
import type { TDeepPartial } from '@/utils/deep-partial'
import type { Nullish } from '@/utils/nullish'

import { faker } from '@faker-js/faker'
import _ from 'lodash'

export type TRepositoryRaw = {
  id: string | number
  name: string
  size: number
  owner:
    | string
    | {
        login: string
      }
  private: boolean | number
  language: Nullish<string>
  pushed_at?: string
  created_at?: string
  updated_at?: string
}

export function makeRepositoryRaw(overrides: TDeepPartial<TRepositoryRaw> = {}): TRawSchemaGithubRepository {
  const repositoryRaw = _.merge<TRawSchemaGithubRepository, TDeepPartial<TRepositoryRaw>>(
    {
      id: faker.number.int({ min: 1, max: 999999 }),
      name: faker.person.fullName(),
      size: faker.number.int({ min: 5000, max: 20000 }),
      owner: {
        login: faker.internet.username(),
      },
      private: faker.datatype.boolean(),
      language: faker.lorem.word(),
      pushed_at: faker.date.past().toISOString(),
      created_at: faker.date.past().toISOString(),
      updated_at: faker.date.recent().toISOString(),
    } as unknown as TRawSchemaGithubRepository,
    overrides,
  )

  if (typeof repositoryRaw.owner === 'string') {
    return {
      ...repositoryRaw,
      owner: {
        login: repositoryRaw.owner,
      },
    } as unknown as TRawSchemaGithubRepository
  }

  return repositoryRaw
}
