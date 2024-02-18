import { setupWorker } from 'msw/browser'
import { HttpResponse, http } from 'msw'

export function setupMsw() {
  if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_API === 'true') {
    const worker = setupWorker(...[
      http.get('/example', () => {
        return HttpResponse.json({ user: { name: 'hanako' } })
      }),
    ])
    worker.start()
  }
}
