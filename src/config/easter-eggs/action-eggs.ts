import type { TEasterEggEgg } from '@/services/controller/easter-egg'

export const actionEggs = [
  {
    name: 'email',
  },
  {
    name: 'sonic',
  },
] as const satisfies TEasterEggEgg[]
