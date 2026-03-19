import type { TMainProviderProps } from '@/providers/main'

import { Analytics } from './analytics'
import { EventEggs } from './event-eggs'
import { Idle } from './idle'
import { MouseTrack } from './mouseTrack'
import { PageColors } from './page-colors'
import { SoundSystem } from './sound-system'

export function MainProvider({ children }: TMainProviderProps) {
  return (
    <>
      <SoundSystem />
      <Analytics />
      <PageColors />
      <MouseTrack />
      <Idle />
      <EventEggs />
      {children}
    </>
  )
}
