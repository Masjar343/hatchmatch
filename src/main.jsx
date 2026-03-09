import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HatchMatch from './HatchMatch'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HatchMatch />
  </StrictMode>,
)
