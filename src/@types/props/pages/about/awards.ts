import type { HTMLAttributes } from 'react'

import { z } from 'zod/v4'

export const ZAwardsTitleProps = z.custom<HTMLAttributes<HTMLHeadingElement>>()
export const ZAwardsAwardProps = z.custom<HTMLAttributes<HTMLSpanElement>>()

//
//
//
//

export type TAwardsTitleProps = z.infer<typeof ZAwardsTitleProps>
export type TAwardsAwardProps = z.infer<typeof ZAwardsAwardProps>
