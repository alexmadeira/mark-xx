import type { TResizeSizes } from '@/services/lib/image/resize'

export const cloudinaryImageSizes = {
  blur: {
    width: 10,
  },
  original: {
    width: 'iw',
    height: 'ih',
  },
} as const satisfies TResizeSizes
