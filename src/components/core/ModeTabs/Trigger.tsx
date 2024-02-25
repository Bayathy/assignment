import type { ComponentProps, FC } from 'react'
import { TabsTrigger as RaidxTabsTrigger } from '@radix-ui/react-tabs'
import { css } from '@kuma-ui/core'

export const TabsTrigger: FC<ComponentProps<typeof RaidxTabsTrigger>> = ({ ...props }) => {
  return (
    <RaidxTabsTrigger
      className={css`
        padding: 4px;
        color: #fff;
        background-color: t("colors.primary");
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;

        &[data-state='active'] {
          background-color: t("colors.secondary");
        }
  `}
      {...props}
    />
  )
}
