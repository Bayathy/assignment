import type { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

/**
 * テスト用のQueryProvider
 * エラーをテストするために、エラー時のdelayを0に設定している
 * @param children
 * @returns
 */

export const TestQueryProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              retryDelay: 1,
              retry: 0,
            },
          },
        })
      }
    >
      {children}
    </QueryClientProvider>
  )
}
