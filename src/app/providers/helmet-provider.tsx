import type { THelmetProviderProps } from '@/providers/helmet'

import { Helmet, HelmetProvider as ReactHelmetProvider } from 'react-helmet-async'

export function HelmetProvider({ children, ...props }: THelmetProviderProps) {
  return (
    <ReactHelmetProvider>
      <Helmet {...props} />
      {children}
    </ReactHelmetProvider>
  )
}
