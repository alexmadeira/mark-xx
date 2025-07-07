import type { TDataGlobalPages, TDataGlobalRoutes } from '@/services/content-data/global'

import { About } from '_APP/pages/about'
import { Home } from '_APP/pages/home'
import { Project } from '_APP/pages/project'
import { Projects } from '_APP/pages/projects'

export const dataGlobalPages = {
  home: Home,
  about: About,
  project: Project,
  projects: Projects,
} satisfies TDataGlobalPages

export const dataGlobalRoutes = [
  {
    path: '/',
    code: 'home',
    color: {
      name: 'white',
      hex: '#ffffff',
      twVar: '--color-white',
    },
  },
  {
    path: '/about',
    code: 'about',
    color: {
      name: 'mark',
      hex: '#e9f1f8',
      twVar: '--color-mark-100',
    },
  },
  {
    path: '/projects',
    code: 'projects',
    color: {
      name: 'zinc',
      hex: '#f5f4f4',
      twVar: '--color-zinc-100',
    },
  },
  {
    path: '/project/mizuno-br',
    code: 'project',
    color: {
      name: 'blue',
      hex: '#ffffff',
      twVar: '--color-blue-100',
    },
    header: {
      className: 'bg-gradient-to-b from-blue-100 from-50% to-transparent to-100%',
    },
  },
  {
    path: '/project/chilli-beans',
    code: 'project',
    color: {
      name: 'black',
      hex: '#000000',
      twVar: '--color-black',
    },
    header: {
      className: 'bg-gradient-to-b from-black from-50% to-transparent to-100%',
    },
  },
] satisfies TDataGlobalRoutes
