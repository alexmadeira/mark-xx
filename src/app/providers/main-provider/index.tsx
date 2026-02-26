import type { TMainProviderProps } from '@/providers/main'

import { Analytics } from './analytics'
import { MouseTrack } from './mouseTrack'
import { PageColors } from './page-colors'

export function MainProvider({ children }: TMainProviderProps) {
  return (
    <>
      <Analytics />
      <PageColors />
      <MouseTrack />
      {children}
    </>
  )
}
