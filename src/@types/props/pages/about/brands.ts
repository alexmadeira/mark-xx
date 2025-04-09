import { HTMLAttributes } from 'react'

import { z } from 'zod'

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
