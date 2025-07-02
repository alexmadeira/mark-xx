import type { HTMLAttributes } from 'react'

import { z } from 'zod/v4'

export const ZBrandsBrandProps = z.intersection(
  z.custom<HTMLAttributes<HTMLHeadingElement>>(),
  z.object({
    index: z.coerce.number(),
  }),
)

//
//
//
//

export type TBrandsBrandProps = z.infer<typeof ZBrandsBrandProps>
