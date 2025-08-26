import type { TRoutePath } from '@/config/route/path'

export const routePaths = [
  {
    pathname: '/',
    type: 'home',
    color: {
      hex: '#ffffff',
      twVar: '--color-white',
    },
  },
  {
    pathname: '/about',
    type: 'about',
    color: {
      hex: '#e9f1f8',
      twVar: '--color-mark-100',
    },
  },
  {
    pathname: '/projects',
    type: 'projects',
    color: {
      hex: '#f5f4f4',
      twVar: '--color-zinc-100',
    },
  },
  {
    pathname: '/project/:slug',
    type: 'project',
    color: {
      hex: '#ffffff',
      twVar: '--color-blue-100',
    },
  },
  {
    pathname: '/project/chilli-beans',
    type: 'project',
    color: {
      hex: '#000000',
      twVar: '--color-black',
    },
  },
] satisfies TRoutePath[]
