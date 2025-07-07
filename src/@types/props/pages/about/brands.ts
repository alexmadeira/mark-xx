import type { HTMLAttributes } from 'react'

import { z } from 'zod/v4'

export const ZBrandsBrandProps = z.custom<HTMLAttributes<HTMLHeadingElement>>()

//
//
//
//

export type TBrandsBrandProps = z.infer<typeof ZBrandsBrandProps>
