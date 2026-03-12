import { z } from 'zod/v4'

export const ZLoaderMediaEvents = z.object({
  'MEDIA:Error': z.void(),
  'MEDIA:Started': z.string(),
  'MEDIA:Finished': z.string(),
  'MEDIA:AllFinished': z.void(),
  'MEDIA:Update': z.number(),
  'MEDIA:CheckDocument': z.void(),
  'MEDIA:ReCheckDocument': z.void(),
  'MEDIA:VIDEO:Error': z.string(),
  'MEDIA:VIDEO:Started': z.string(),
  'MEDIA:VIDEO:Finished': z.string(),
  'MEDIA:VIDEO:Update': z.number(),
  'MEDIA:VIDEO:AllFinished': z.void(),
  'MEDIA:IMAGE:Error': z.string(),
  'MEDIA:IMAGE:Started': z.string(),
  'MEDIA:IMAGE:Finished': z.string(),
  'MEDIA:IMAGE:Update': z.number(),
  'MEDIA:IMAGE:AllFinished': z.void(),
})

//
//
//

export type TLoaderMediaEvents = z.infer<typeof ZLoaderMediaEvents>
