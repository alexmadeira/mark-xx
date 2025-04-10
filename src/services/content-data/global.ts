import { TDataGlobalPages, TDataGlobalRoutes } from '@/services/content-data/global'

import { About } from '_APP/pages/about'
import { Home } from '_APP/pages/home'
import { Project } from '_APP/pages/project'

export const dataGlobalPages = {
  home: Home,
  about: About,
  project: Project,
} satisfies TDataGlobalPages

export const dataGlobalRoutes = [
  {
    path: '/',
    code: 'home',
    color: {
      name: 'white',
      hex: '#00ffff',
      twVar: '--color-white',
    },
  },
  {
    path: '/about',
    code: 'about',
    color: {
      name: 'white',
      hex: '#ffffff',
      twVar: '--color-white',
    },
  },
  {
    path: '/project',
    code: 'project',
    color: {
      name: 'mark',
      hex: '#c9ddee',
      twVar: '--color-mark-100',
    },
  },
  {
    path: '/project/drogasil',
    code: 'project',
    color: {
      name: 'mark',
      hex: '#c9ddee',
      twVar: '--color-mark-100',
    },
  },
  {
    path: '/project/jeep/compass',
    code: 'project',
    color: {
      name: 'mark',
      hex: '#c9ddee',
      twVar: '--color-node-100',
    },
  },
] satisfies TDataGlobalRoutes
