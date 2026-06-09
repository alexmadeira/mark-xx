import type { TPageHeaderContextProps, TPageHeaderProvider } from '@/props/components/ui-element/page/header'

import { createContext, use } from 'react'

const HeaderContext = createContext<TPageHeaderContextProps>({})

function HeaderProvider({ children, ...props }: TPageHeaderProvider) {
  return <HeaderContext value={props}>{children}</HeaderContext>
}

function useHeader() {
  const context = use(HeaderContext)
  if (!context) {
    throw new Error('useHeader must be used within an HeaderProvider')
  }
  return context
}

export { useHeader, HeaderProvider }
