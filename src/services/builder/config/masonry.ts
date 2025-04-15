import type { TMasonryProps } from '@/services/builder/masonry'

export const configHomeMasonry = {
  area: 20,
  fill: {
    className: 'col-span-3 row-span-3 md:col-span-1 md:row-span-1',
    w: 1,
    h: 1,
    area: 1,
  },
  required: {
    className: 'col-span-3 row-span-3',
    w: 3,
    h: 3,
    area: 9,
  },
  sizes: [
    {
      className: 'col-span-3 row-span-3 md:col-span-2 md:row-span-2',
      w: 2,
      h: 2,
      area: 4,
    },
    {
      className: 'col-span-3 row-span-3 md:col-span-2 md:row-span-1',
      w: 2,
      h: 1,
      area: 2,
    },
  ],
  contents: [
    {
      className: 'bg-black',
      src: '/img/temp/projects/chilli.png',
      link: '/project/chilli-beans',
    },
    {
      src: '/img/temp/projects/mizuno-banner.png',
      className: 'bg-white',
      link: '/project/mizuno-br',
    },
    {
      className: 'bg-teal-400',
      src: '/img/temp/projects/chilli.png',
      link: '/project/chilli-beans',
    },
    {
      src: '/img/temp/projects/mizuno-banner.png',
      className: 'bg-yellow-500',
      link: '/project/mizuno-br',
    },
    {
      className: 'bg-purple-500',
      src: '/img/temp/projects/chilli.png',
      link: '/project/chilli-beans',
    },
    {
      src: '/img/temp/projects/mizuno-banner.png',
      className: 'bg-green-600',
      link: '/project/mizuno-br',
    },
    {
      className: 'bg-red-500',
      src: '/img/temp/projects/chilli.png',
      link: '/project/chilli-beans',
    },
    {
      src: '/img/temp/projects/mizuno-banner.png',
      className: 'bg-fuchsia-500',
      link: '/project/mizuno-br',
    },
    {
      className: 'bg-zinc-500',
      src: '/img/temp/projects/chilli.png',
      link: '/project/chilli-beans',
    },
    {
      src: '/img/temp/projects/mizuno-banner.png',
      className: 'bg-indigo-500',
      link: '/project/mizuno-br',
    },
  ],
} satisfies TMasonryProps
