import type { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const TestQueryProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={new QueryClient({
      defaultOptions: {
        queries: {
          retryDelay: 1,
          retry: 0,
        },
      },
    })}
    >
      {children}
    </QueryClientProvider>
  )
}
