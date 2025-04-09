import type { LinkProps } from 'react-router-dom'

import { z } from 'zod'

export const ZNavLinkProps = z.intersection(z.custom<LinkProps>(), z.object({}))

//
//
//
//

export type TNavLinkProps = z.infer<typeof ZNavLinkProps>
