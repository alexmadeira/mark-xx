import { z } from 'zod'

import { TECHNOLOGIES_KEY } from '_SRV/constant/technologies'

export const ZETechnologyKey = z.enum(TECHNOLOGIES_KEY)

//
//
//
//

export type TETechnologyKey = z.infer<typeof ZETechnologyKey>
