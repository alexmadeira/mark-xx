import { z } from 'zod/v4'

export const ZREggListenersProps = z.object({})

//
//
//

export type TREggListenersProps = z.infer<typeof ZREggListenersProps>
