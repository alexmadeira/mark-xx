import type { TEasterEggEgg } from '@/services/controller/easter-egg'

export const globalEggs = [
  {
    name: 'toasty',
    keyCombo: ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'],
  },
  {
    name: 'snake',
    keyCombo: ['s', 'n', 'a', 'k', 'e'],
  },
] satisfies TEasterEggEgg[]
