import { z } from 'zod/v4'

import {
  PAGE_BLOCK_GALLERY_TYPES,
  PAGE_BLOCK_MEDIA_TYPES,
  PAGE_BLOCK_TEXT_TYPES,
  PAGE_BLOCK_TYPES,
  PAGE_STATUS,
} from '_SRV/constant/page'

export const ZEPageStatus = z.enum(PAGE_STATUS)

export const ZEPageBlockGalleryType = z.enum(PAGE_BLOCK_GALLERY_TYPES)
export const ZEPageBlockMediaType = z.enum(PAGE_BLOCK_MEDIA_TYPES)
export const ZEPageBlockTextType = z.enum(PAGE_BLOCK_TEXT_TYPES)
export const ZEPageBlockType = z.enum(PAGE_BLOCK_TYPES)

//
//
//

export type TEPageStatus = z.infer<typeof ZEPageStatus>

export type TEPageBlockGalleryType = z.infer<typeof ZEPageBlockGalleryType>
export type TEPageBlockMediaType = z.infer<typeof ZEPageBlockMediaType>
export type TEPageBlockTextType = z.infer<typeof ZEPageBlockTextType>
export type TEPageBlockType = z.infer<typeof ZEPageBlockType>
