import { z } from 'zod/v4'

import { REPOSITORY_OMITTED_LANGUAGES } from '_SRV/constant/repository'

export const ZRepositoryOmittedLanguages = z.enum(REPOSITORY_OMITTED_LANGUAGES)

//
//
//
//

export type TRepositoryOmittedLanguages = z.infer<typeof ZRepositoryOmittedLanguages>
