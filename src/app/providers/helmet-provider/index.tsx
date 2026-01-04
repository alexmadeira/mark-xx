import type { THelmetProviderProps } from '@/providers/helmet'

import { Helmet, HelmetProvider as ReactHelmetProvider } from 'react-helmet-async'

import { SEOConfig } from './seo-config'

export function HelmetProvider({ children, ...props }: THelmetProviderProps) {
  return (
    <ReactHelmetProvider>
      <Helmet {...props} />
      <SEOConfig />
      {children}
    </ReactHelmetProvider>
  )
}
