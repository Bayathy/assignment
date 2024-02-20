import { css } from '@kuma-ui/core'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import { memo } from 'react'
import type { ComponentPropsWithoutRef, FC } from 'react'

export const Checkbox: FC<ComponentPropsWithoutRef<typeof RadixCheckbox.Root>> = memo(({ ...props }) => (
  <RadixCheckbox.Root
    className={css`
        width: 28px;
        height: 28px;
        border-radius: 4px  ;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background-color: #fff;
        [data-state='checked'] {
          background-color: #000;
          color: #fff;
        }

        * {
          width: inherit;
          height: inherit;
          border-radius: inherit;
        }
      `}
    {...props}
  >
    <RadixCheckbox.Indicator>
      <CheckIcon />
    </RadixCheckbox.Indicator>
  </RadixCheckbox.Root>

))
