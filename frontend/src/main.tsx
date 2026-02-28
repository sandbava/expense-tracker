import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import './index.css'
import {ToastProvider} from "./context/ToastProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ToastProvider>
          <App />
      </ToastProvider>
  </StrictMode>,
)
