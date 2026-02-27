import { z } from 'zod/v4'

export const ZClarityPageViewProps = z.tuple([z.string()])
export const ZClarityTrackEventProps = z.tuple([z.string()])
export const ZClaritySetUserPropertiesProps = z.tuple([
  z.record(z.string(), z.union([z.string(), z.array(z.string())])),
])

export const ZClarityProps = z.object({
  projectId: z.string(),
})

//
//
//
//

export type TClarityPageViewProps = z.infer<typeof ZClarityPageViewProps>
export type TClarityTrackEventProps = z.infer<typeof ZClarityTrackEventProps>
export type TClaritySetUserPropertiesProps = z.infer<typeof ZClaritySetUserPropertiesProps>

export type TClarityProps = z.infer<typeof ZClarityProps>
