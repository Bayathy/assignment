import { css } from '@kuma-ui/core'
import * as RadixToggle from '@radix-ui/react-toggle'
import type { ComponentPropsWithoutRef, FC } from 'react'
import { memo } from 'react'
import { clsx } from 'clsx'

export const Toggle: FC<ComponentPropsWithoutRef<typeof RadixToggle.Root>> = memo(({ className, ...props }) => (
  <RadixToggle.Root
    className={clsx(css`
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px;
      outline: 2px solid t("colors.primary");


      &:focus-visible { 
        outline-offset: 2px;
        outline-color: t("colors.secondary");
      }

      &[data-state='on'] {
        background-color: t("colors.primary");
        color: #fff;
      }
      `, className)}
    {...props}
  >
  </RadixToggle.Root>

))
