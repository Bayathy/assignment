import React from 'react'
import ReactDOM from 'react-dom/client'
import { SWRConfig } from 'swr'
import App from './App.tsx'
import '@unocss/reset/tailwind.css'

import { setupMockWorker } from './mocks/browser.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SWRConfig value={{
      onError: (err) => {
        if (err.status !== 404)
          console.error(err)
      },
    }}
    >
      <App />
    </SWRConfig>
  </React.StrictMode>,
)
