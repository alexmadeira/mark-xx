import { HTMLAttributes } from 'react'

import { z } from 'zod'

export const ZProjectDetailsProps = z.intersection(
  z.custom<HTMLAttributes<HTMLDivElement>>(),
  z.object({
    image: z.custom<HTMLAttributes<HTMLImageElement>>(),
  }),
)

//
//
//
//

export type TProjectDetailsProps = z.infer<typeof ZProjectDetailsProps>
