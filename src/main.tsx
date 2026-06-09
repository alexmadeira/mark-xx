import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app'

import './services/lib/lodash'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
