import type { TMasonryProps } from '@/services/builder/masonry'

export const configHomeMasonry = {
  name: 'home-masonry',
  area: 124,
  random: true,
  fill: {
    className: 'col-span-12 row-span-12 sm:col-span-3 sm:row-span-3 lg:col-span-2 lg:row-span-2',
    w: 2,
    h: 2,
  },
  required: {
    className: 'col-span-12 row-span-12 sm:col-span-9 sm:row-span-9 lg:col-span-6 lg:row-span-6',
    w: 8,
    h: 8,
  },
  sizes: [
    {
      className: 'col-span-12 row-span-12 sm:col-span-6 sm:row-span-6 lg:col-span-4 lg:row-span-4',
      w: 4,
      h: 4,
      limit: 1,
    },
    {
      className: 'col-span-12 row-span-12 sm:col-span-6 sm:row-span-3  lg:col-span-4 lg:row-span-2',
      w: 4,
      h: 2,
      limit: 3,
    },
    {
      className: 'col-span-12 row-span-12 sm:col-span-3 sm:row-span-6 lg:col-span-2 lg:row-span-4',
      w: 2,
      h: 4,
      limit: 1,
    },
  ],
} satisfies TMasonryProps

export const configProjectsMasonry = {
  name: 'projects-masonry',
  random: true,
  fill: {
    className: 'col-span-12 row-span-12 sm:col-span-3 sm:row-span-3 md:col-span-2 md:row-span-2',
    w: 2,
    h: 2,
  },
  required: {
    className: 'col-span-12 row-span-12 sm:col-span-9 sm:row-span-9 md:col-span-6 md:row-span-6',
    w: 8,
    h: 8,
  },
  sizes: [
    {
      className:
        'col-span-12 row-span-12 sm:col-span-6 sm:row-span-6 md:col-span-4 md:row-span-4 lg:col-span-4 lg:row-span-4',
      w: 4,
      h: 4,
      limit: 1,
    },
    {
      className:
        'col-span-12 row-span-12 sm:col-span-6 sm:row-span-3 md:col-span-4 md:row-span-2 lg:col-span-4 lg:row-span-2',
      w: 4,
      h: 2,
    },
    {
      className:
        'col-span-12 row-span-12 sm:col-span-3 sm:row-span-6 md:col-span-2 md:row-span-4 lg:col-span-2 lg:row-span-4',
      w: 2,
      h: 4,
    },
  ],
} satisfies TMasonryProps

export const configProjectMasonry = {
  name: 'project-masonry',
  random: true,
  area: 124,
  fill: {
    className: 'col-span-12 row-span-12 sm:col-span-3 sm:row-span-3 md:col-span-2 md:row-span-2',
    w: 2,
    h: 2,
  },
  required: {
    className: 'col-span-12 row-span-12 sm:col-span-9 sm:row-span-9 md:col-span-6 md:row-span-6',
    w: 8,
    h: 8,
  },
  sizes: [
    {
      className:
        'col-span-12 row-span-12 sm:col-span-6 sm:row-span-6 md:col-span-4 md:row-span-4 lg:col-span-4 lg:row-span-4',
      w: 4,
      h: 4,
      limit: 1,
    },
    {
      className:
        'col-span-12 row-span-12 sm:col-span-6 sm:row-span-3 md:col-span-4 md:row-span-2 lg:col-span-4 lg:row-span-2',
      w: 4,
      h: 2,
    },
    {
      className:
        'col-span-12 row-span-12 sm:col-span-3 sm:row-span-6 md:col-span-2 md:row-span-4 lg:col-span-2 lg:row-span-4',
      w: 2,
      h: 4,
    },
  ],
} satisfies TMasonryProps
