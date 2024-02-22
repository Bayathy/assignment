import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@unocss/reset/tailwind.css'
import './global.css'

import { setupMockWorker } from './mocks/browser.ts'
import { SWRProvider } from './components/provider/SWRProvider/index.tsx'

setupMockWorker().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <SWRProvider>
        <App />
      </SWRProvider>
    </React.StrictMode>,
  )
})
