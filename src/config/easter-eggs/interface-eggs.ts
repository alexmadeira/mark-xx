import type { TEasterEggEgg } from '@/services/controller/easter-egg'

export const interfaceEggs = [
  {
    name: 'toasty',
    keyCombo: ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'],
  },
] as const satisfies TEasterEggEgg[]
