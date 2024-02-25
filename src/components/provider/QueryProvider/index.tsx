import { type FC, type PropsWithChildren, useCallback, useState } from 'react'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AlertDialog } from '../../ui/AlertDialog'

export const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleOpenChange = useCallback((open: boolean) => {
    setOpen(open)
  }, [])

  return (
    <QueryClientProvider client={
      new QueryClient({
        queryCache: new QueryCache({
          onError: (err: Error) => {
            console.error(err)
            setErrorMessage(err.message)
            handleOpenChange(true)
          },
        }),
      })
    }
    >
      <AlertDialog onOpenChange={handleOpenChange} open={open} description={errorMessage} />
      {children}
    </QueryClientProvider>
  )
}
