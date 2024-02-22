import { type FC, type PropsWithChildren, useCallback, useState } from 'react'
import { SWRConfig } from 'swr'
import { AlertDialog } from '../../ui/AlertDialog'
import type { HandledError } from '../../../lib/errorHandler'

export const SWRProvider: FC<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleOpenChange = useCallback((open: boolean) => {
    setOpen(open)
  }, [])

  return (
    <SWRConfig value={{
      onError: (err: HandledError) => {
        console.error(err)
        setErrorMessage(err.message)
        handleOpenChange(true)
      },
    }}
    >
      <AlertDialog onOpenChange={handleOpenChange} open={open} description={errorMessage} />
      {children}
    </SWRConfig>
  )
}
