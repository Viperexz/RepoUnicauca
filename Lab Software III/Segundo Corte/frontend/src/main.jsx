import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import MainProductos from './vista/mainProductos.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainProductos />
  </StrictMode>,
)
