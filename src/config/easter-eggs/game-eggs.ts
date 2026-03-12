import type { TEasterEggEgg } from '@/services/controller/easter-egg'

export const gameEggs = [
  {
    name: 'snake',
    keyCombo: ['s', 'n', 'a', 'k', 'e'],
  },
] as const satisfies TEasterEggEgg[]
