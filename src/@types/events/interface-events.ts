import { z } from 'zod/v4'

export const ZInterfaceEvents = z.object({
  'INTERFACE:ACTION:Email': z.undefined(),
  'INTERFACE:ACTION:coin': z.undefined(),
  'INTERFACE:ACTION:LiveUp': z.undefined(),
  'INTERFACE:ACTION:Toasty': z.undefined(),
})

//
//
//

export type TInterfaceEvents = z.infer<typeof ZInterfaceEvents>
