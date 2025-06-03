import { TDataGlobalPages, TDataGlobalRoutes } from '@/services/content-data/global'

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
      twVar: '--color-mark-200',
    },
  },
  {
    path: '/projects',
    code: 'projects',
    color: {
      name: 'mark',
      hex: '#c9ddee',
      twVar: '--color-mark-100',
    },
  },
  {
    path: '/project/mizuno-br',
    code: 'project',
    color: {
      name: 'mark',
      hex: '#ffffff',
      twVar: '--color-mark-100',
    },
  },
  {
    path: '/project/chilli-beans',
    code: 'project',
    color: {
      name: 'mark',
      hex: '#000000',
      twVar: '--color-white',
    },
  },
] satisfies TDataGlobalRoutes
