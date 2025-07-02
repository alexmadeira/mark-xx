import type { LinkProps } from 'react-router-dom'

import { z } from 'zod/v4'

export const ZNavLinkProps = z.intersection(
  z.custom<LinkProps>(),
  z.object({
    'data-name': z.string(),
  }),
)

//
//
//
//

export type TNavLinkProps = z.infer<typeof ZNavLinkProps>
