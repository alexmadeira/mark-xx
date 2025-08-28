import type { TPageHeaderContextProps, TPageHeaderProvider } from '@/props/components/ui-element/page/header'

import { createContext, useContext } from 'react'

const HeaderContext = createContext<TPageHeaderContextProps>({})

function HeaderProvider({ children, ...props }: TPageHeaderProvider) {
  return <HeaderContext.Provider value={props}>{children}</HeaderContext.Provider>
}

function useHeader() {
  const context = useContext(HeaderContext)
  if (!context) {
    throw new Error('useHeader must be used within an HeaderProvider')
  }
  return context
}

export { useHeader, HeaderProvider }
