import type { TMasonryCreateProps } from '@/services/builder/masonry'

export const configHomeMasonry = {
  fill: { className: 'col-span-1 row-span-1', w: 1, h: 1, area: 1 },
  required: { className: 'col-span-3 row-span-3', w: 3, h: 3, area: 9 },
  sizes: [
    { className: 'col-span-2 row-span-2', w: 2, h: 2, area: 4 },
    { className: 'col-span-2 row-span-1', w: 2, h: 1, area: 2 },
  ],
} satisfies TMasonryCreateProps
