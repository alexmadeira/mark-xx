import { RouterProvider } from 'react-router-dom'

import { Provider } from './providers'
import { router } from './routes'

export function App() {
  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  )
}
