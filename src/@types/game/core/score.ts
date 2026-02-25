import { z } from 'zod/v4'

export const ZScoreSetPointValueProps = z.tuple([z.number()])
export const ZScoreProps = z.object({
  defaultPointValue: z.number(),
})

//
//
//
//

export type TScoreSetPointValueProps = z.infer<typeof ZScoreSetPointValueProps>
export type TScoreProps = z.infer<typeof ZScoreProps>
