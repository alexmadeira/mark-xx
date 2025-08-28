import { RouterProvider } from 'react-router-dom'

import { Provider } from './providers'
import { router } from './routes'

export function App() {
  return (
    <Provider
      helmetProps={{
        titleTemplate: 'Alex Madeira | %s',
        defaultTitle: 'Alex Madeira | Desenvolvedor Web',
      }}
    >
      <RouterProvider router={router} />
    </Provider>
  )
}
