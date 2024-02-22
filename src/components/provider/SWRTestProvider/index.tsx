import { SWRConfig } from 'swr'

interface Props {
  children?: React.ReactNode
}

/**
 * test時にswrのcacheを使わないようにするためのProvider
 * https://swr.vercel.app/ja/docs/advanced/cache
 */
export const SwrTestProvider: React.FC<Props> = ({ children }) => {
  return (
    <SWRConfig value={{ provider: () => new Map() }}>
      {children}
    </SWRConfig>
  )
}
