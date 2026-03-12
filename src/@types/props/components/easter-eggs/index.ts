import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { z } from 'zod/v4'

export const ZEmailEggProps = z.intersection(
  z.custom<ButtonHTMLAttributes<HTMLButtonElement>>(),
  z.object({
    backDelay: z.number().optional(),
    onClickContent: z.custom<ReactNode>().optional(),
  }),
)

//
//
//
//

export type TEmailEggProps = z.infer<typeof ZEmailEggProps>
