import type { Config } from 'prismic-ts-codegen'

import dotenvx from '@dotenvx/dotenvx'

dotenvx.config()

const config: Config = {
  output: './src/@types/prismic/mark-xx/types.d.ts',
  repositoryName: process.env.VITE_PRISMIC_REPOSITORY_NAME,
  accessToken: process.env.VITE_PRISMIC_ACCESS_TOKEN,
  customTypesAPIToken: process.env.PRISMIC_CUSTOM_TYPES_TOKEN,
  models: {
    fetchFromRepository: true,
  },
}

export default config
