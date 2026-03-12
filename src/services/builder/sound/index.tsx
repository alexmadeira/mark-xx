import type { TSoundSystemSoundMap } from '@/services/builder/sound'

import { SoundManager } from './sound-manager'

let managerSound: SoundManager

export function soundManager<T extends TSoundSystemSoundMap>(soundMap?: T): SoundManager<T> {
  if (!soundMap && !managerSound) throw new Error('SoundManager needs a soundMap to be initialized for the first time.')
  if (!!soundMap && !managerSound) managerSound = new SoundManager<T>(soundMap)
  return managerSound
}
