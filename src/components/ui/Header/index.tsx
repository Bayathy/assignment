import { css } from '@kuma-ui/core'
import type { FC } from 'react'

export const Header: FC = () => {
  return (
    <header className={css`
      padding: 16px;
      text-align: left;
      background-color: t("colors.primary");
    `}
    >
      <h1 className={
        css`
          color: #fff;
        `
      }
      >
        日本の人口推移
      </h1>
    </header>
  )
}
