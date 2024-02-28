import { css } from '@kuma-ui/core'
import type { FC, PropsWithChildren } from 'react'
import { Header } from '../ui/Header'

export const HomeLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={css`
        display: grid;
        grid-template-rows: auto 1fr;
        grid-template-columns: 100%;
        gap: 16px;
        min-height: 100vh;
      `}
    >
      <Header />
      {children}
    </div>
  )
}
