import type { TMainProviderProps } from '@/providers/main'

import { PageColors } from './page-colors'

export function MainProvider({ children }: TMainProviderProps) {
  return (
    <>
      <PageColors />
      {children}
    </>
  )
}
