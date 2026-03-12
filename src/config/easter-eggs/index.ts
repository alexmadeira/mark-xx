import type { TEasterEggEgg } from '@/services/controller/easter-egg'

import { actionEggs } from './action-eggs'
import { gameEggs } from './game-eggs'
import { interfaceEggs } from './interface-eggs'

export const easterEggs = [...gameEggs, ...interfaceEggs, ...actionEggs] satisfies TEasterEggEgg[]
