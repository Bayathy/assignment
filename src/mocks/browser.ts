import { setupWorker } from 'msw'
import { handlers } from './handler'

export async function setupMockWorker() {
  if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_API === 'true') {
    const worker = setupWorker(
      ...handlers,
    )

    worker.start()
  }
}
