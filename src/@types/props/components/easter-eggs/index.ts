import type { ButtonHTMLAttributes, CSSProperties, ReactNode, Ref } from 'react'

import { z } from 'zod/v4'

export const ZEmailCoinEggProps = z.object({
  floatingRef: z.custom<Ref<HTMLDivElement> | undefined>(),
  style: z.custom<CSSProperties>(),
})

export const ZEmail1UPEggProps = z.object({
  floatingRef: z.custom<Ref<HTMLDivElement> | undefined>(),
  style: z.custom<CSSProperties>(),
})

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

export type TEmailCoinEggProps = z.infer<typeof ZEmailCoinEggProps>
export type TEmail1UPEggProps = z.infer<typeof ZEmail1UPEggProps>
export type TEmailEggProps = z.infer<typeof ZEmailEggProps>
