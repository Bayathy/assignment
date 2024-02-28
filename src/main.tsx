// 一番上に置かないとこのスタイルでbuttonのバックグラウンドが上書きされる
import '@unocss/reset/tailwind.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './global.css'

import { setupMockWorker } from './mocks/browser.ts'
import { QueryProvider } from './components/provider/QueryProvider'
import { HomeLayout } from './components/layout/HomeLayout.tsx'

setupMockWorker().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryProvider>
        <HomeLayout>
          <App />
        </HomeLayout>
      </QueryProvider>
    </React.StrictMode>,
  )
})
