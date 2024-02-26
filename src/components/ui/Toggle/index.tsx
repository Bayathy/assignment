import { css } from '@kuma-ui/core'
import * as RadixToggle from '@radix-ui/react-toggle'
import type { ComponentPropsWithoutRef, FC } from 'react'
import { memo } from 'react'
import { clsx } from 'clsx'

export const Toggle: FC<ComponentPropsWithoutRef<typeof RadixToggle.Root>>
  = memo(({ className, ...props }) => (
    <RadixToggle.Root
      className={clsx(
        css`
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          border-radius: 4px;
          outline: 2px solid t("colors.primary");

          &:focus-visible {
            outline-color: t("colors.secondary");
            outline-offset: 2px;
          }

          &[data-state="on"] {
            color: #fff;
            background-color: t("colors.primary");
          }
        `,
        className,
      )}
      {...props}
    >
    </RadixToggle.Root>
  ))
