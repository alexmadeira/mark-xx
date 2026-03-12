import type { TSoundSystemSoundMap } from '@/services/builder/sound'

import { interfaceSoundMap } from './interface-souds'
import { gameSoundMap } from './snake-souds'

export const soundMap = {
  ...gameSoundMap,
  ...interfaceSoundMap,
} satisfies TSoundSystemSoundMap
