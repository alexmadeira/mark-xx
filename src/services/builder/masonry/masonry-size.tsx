import type { TMasonryGridSizes, TMasonrySizeGridSizeProps } from '@/services/builder/masonry/masonry-size'

export class MasonrySize {
  protected constructor() {}

  static get gridSizes(): TMasonryGridSizes {
    return {
      '2x2': {
        className: 'col-span-12 row-span-12 sm:col-span-3 sm:row-span-3 md:col-span-2 md:row-span-2',
        w: 2,
        h: 2,
      },
      '2x4': {
        className:
          'col-span-12 row-span-12 sm:col-span-3 sm:row-span-6 md:col-span-2 md:row-span-4 lg:col-span-2 lg:row-span-4',
        w: 2,
        h: 4,
      },
      '4x2': {
        className:
          'col-span-12 row-span-12 sm:col-span-6 sm:row-span-3 md:col-span-4 md:row-span-2 lg:col-span-4 lg:row-span-2',
        w: 4,
        h: 2,
      },
      '4x4': {
        className:
          'col-span-12 row-span-12 sm:col-span-6 sm:row-span-6 md:col-span-4 md:row-span-4 lg:col-span-4 lg:row-span-4',
        w: 4,
        h: 4,
      },
      '8x8': {
        className: 'col-span-12 row-span-12 sm:col-span-9 sm:row-span-9 md:col-span-6 md:row-span-6',
        w: 8,
        h: 8,
      },
    }
  }

  static gridSize(...[size, limit]: TMasonrySizeGridSizeProps) {
    if (limit) return { ...MasonrySize.gridSizes[size], limit }
    return MasonrySize.gridSizes[size]
  }
}
