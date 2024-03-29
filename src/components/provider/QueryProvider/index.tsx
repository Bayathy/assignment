import { type FC, type PropsWithChildren, useCallback, useState } from 'react'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { AlertDialog } from '../../ui/AlertDialog'

/**
 * QueryProvider
 * エラー時にエラーダイアログを表示するProvider
 * @param children
 * @returns
 */

export const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleOpenChange = useCallback((open: boolean) => {
    setOpen(open)
  }, [])

  return (
    <QueryClientProvider
      client={
        new QueryClient({
          queryCache: new QueryCache({
            onError: (err: Error) => {
              setErrorMessage(err.message)
              handleOpenChange(true)
            },
          }),
        })
      }
    >
      <AlertDialog
        onOpenChange={handleOpenChange}
        open={open}
        description={errorMessage}
      />
      {children}
    </QueryClientProvider>
  )
}
