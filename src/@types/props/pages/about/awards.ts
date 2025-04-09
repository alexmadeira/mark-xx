import type { HTMLAttributes } from 'react'

import { z } from 'zod'

export const ZAwardsTitleProps = z.intersection(z.custom<HTMLAttributes<HTMLHeadingElement>>(), z.object({}))
export const ZAwardsAwardProps = z.intersection(z.custom<HTMLAttributes<HTMLSpanElement>>(), z.object({}))

//
//
//
//

export type TAwardsTitleProps = z.infer<typeof ZAwardsTitleProps>
export type TAwardsAwardProps = z.infer<typeof ZAwardsAwardProps>
