import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { z } from 'zod/v4'

export const ZCopyButtonProps = z.intersection(
  z.custom<ButtonHTMLAttributes<HTMLButtonElement>>(),
  z.object({
    value: z.union([z.string(), z.number()]),
    backDelay: z.number().optional(),
    onClickContent: z.custom<ReactNode>().optional(),
  }),
)

//
//
//
//

export type TCopyButtonProps = z.infer<typeof ZCopyButtonProps>
