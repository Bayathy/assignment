// 一番上に置かないとこのスタイルでbuttonのバックグラウンドが上書きされる
import '@unocss/reset/tailwind.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './global.css'

import { setupMockWorker } from './mocks/browser.ts'
import { QueryProvider } from './components/provider/QueryProvider'

setupMockWorker().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryProvider>
        <App />
      </QueryProvider>
    </React.StrictMode>,
  )
})
