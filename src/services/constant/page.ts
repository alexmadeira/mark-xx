export const PAGE_STATUS = ['idle', 'loading', 'loaded', 'error'] as const

export const PAGE_BLOCK_TEXT_TYPES = ['heading_1', 'heading_2', 'heading_3', 'paragraph'] as const
export const PAGE_BLOCK_MEDIA_TYPES = ['image', 'video'] as const
export const PAGE_BLOCK_GALLERY_TYPES = ['gallery'] as const
export const PAGE_BLOCK_TYPES = [
  ...PAGE_BLOCK_TEXT_TYPES,
  ...PAGE_BLOCK_MEDIA_TYPES,
  ...PAGE_BLOCK_GALLERY_TYPES,
] as const
