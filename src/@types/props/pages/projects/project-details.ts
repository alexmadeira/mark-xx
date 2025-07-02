import type { HTMLAttributes } from 'react'

import { z } from 'zod/v4'

export const ZProjectDetailsProps = z.intersection(
  z.custom<HTMLAttributes<HTMLDivElement>>(),
  z.object({
    image: z.custom<HTMLAttributes<HTMLImageElement>>(),
    color: z.string(),
  }),
)

//
//
//
//

export type TProjectDetailsProps = z.infer<typeof ZProjectDetailsProps>
