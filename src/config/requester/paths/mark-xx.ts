import type { TApiRequesterPaths } from '@/services/api/api-requester'

import z from 'zod'

export const markXXPaths = {
  'mark-xx:tecnologies': {
    method: 'get',
    path: '/mark-xx/tecnologies',
    schema: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        color: z.string(),
        banner: z.string(),
        type: z.string(),
        createdAt: z.coerce.date(),
        lastEdited: z.coerce.date(),
      }),
    ),
  },
} as const satisfies TApiRequesterPaths
