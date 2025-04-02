import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '_SRV/lib'

import { router } from './routes'

export function App() {
  return (
    <HelmetProvider>
      <Helmet
        titleTemplate="%s | Alex Madeira"
        defaultTitle="Alex Madeira | Desenvolvedor Web"
      />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </HelmetProvider>
  )
}
