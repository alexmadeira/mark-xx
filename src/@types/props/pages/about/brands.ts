import type { HTMLAttributes } from 'react'

import { z } from 'zod/v4'

export const ZBrandsBrandProps = z.intersection(
  z.custom<HTMLAttributes<HTMLDivElement>>(),
  z.object({
    logo: z.url(),
    name: z.string(),
  }),
)

//
//
//
//

export type TBrandsBrandProps = z.infer<typeof ZBrandsBrandProps>
