import type { ReactNode } from 'react'

import { z } from 'zod'

export const ZPageWrapperProps = z.object({ children: z.custom<ReactNode>() })

//
//
//
//

export type TPageWrapperProps = z.infer<typeof ZPageWrapperProps>
