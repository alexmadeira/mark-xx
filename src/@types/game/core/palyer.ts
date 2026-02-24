import { z } from 'zod/v4'

import { ZEntityProps } from './entity'

export const ZPlayerProps = z.object({
  ...ZEntityProps.shape,
  tileSize: z.number(),
})

//
//
//
//

export type TPlayerProps = z.infer<typeof ZPlayerProps>
