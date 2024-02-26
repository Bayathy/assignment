import { css } from '@kuma-ui/core'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import { memo } from 'react'
import type { ComponentPropsWithoutRef, FC } from 'react'
import { clsx } from 'clsx'

export const Checkbox: FC<ComponentPropsWithoutRef<typeof RadixCheckbox.Root>>
  = memo(({ className, checked, ...props }) => (
    <RadixCheckbox.Root
      className={clsx(
        css`
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          cursor: pointer;
          background-color: #fff;
          border: 2px solid red;
          border-radius: 4px;

          [data-state="checked"] {
            color: #fff;
            background-color: #000;
          }

          * {
            width: inherit;
            height: inherit;
            border-radius: inherit;
          }
        `,
        className,
      )}
      checked={checked}
      {...props}
    >
      <RadixCheckbox.Indicator>
        <CheckIcon />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  ))
