import { css } from '@kuma-ui/core'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import clsx from 'clsx'
import type { ComponentProps, FC } from 'react'

export const Checkbox: FC<ComponentProps<typeof RadixCheckbox.Root>> = ({
  children,
  defaultChecked,
  className,
  onCheckedChange,
  ...props
}) => {
  return (
    <div
      className={css`
        display: inline-block;
        padding: 2px;
      `}
    >
      <RadixCheckbox.Root
        {...props}
        className={clsx(
          css`
            display: flex;
            align-items: center;
            justify-content: center;
            width: fit-content;
            height: fit-content;
            padding: 4px;
            cursor: pointer;
            background-color: #fff;
            border: 2px solid t("colors.primary");
            border-radius: 8px;

            &[data-state="checked"] {
              color: #fff;
              background-color: t("colors.primary");
            }
          `,
          className,
        )}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
      >
        {children}
      </RadixCheckbox.Root>
      <label
        className={css`
          position: absolute;
          display: inline-block;
          width: 1px;
          height: 1px;
          cursor: pointer;
          visibility: hidden;
        `}
      >
        {children}
      </label>
    </div>
  )
}
