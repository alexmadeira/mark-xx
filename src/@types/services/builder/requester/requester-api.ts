import type { AxiosInstance } from 'axios'

import { z } from 'zod/v4'

export const ZRequesterApiInstance = z.custom<AxiosInstance>()

//
//
//
//

export type TRequesterApiInstance = z.infer<typeof ZRequesterApiInstance>
