import { css } from '@kuma-ui/core'
import * as RadixDialog from '@radix-ui/react-dialog'
import type { FC } from 'react'

interface Props {
  open: boolean
  description: string
  onOpenChange: (open: boolean) => void
}

export const AlertDialog: FC<Props> = ({ open, description, onOpenChange }) => {
  return (
    <RadixDialog.Root open={open}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay
          className={css`
            position: fixed;
            inset: 0;
            z-index: 1000;
            background-color: rgb(0 0 0 / 50%);
          `}
        />
        <RadixDialog.Content
          className={css`
            position: fixed;
            top: 50%;
            left: 50%;
            z-index: 1001;
            width: 100%;
            max-width: 320px;
            padding: 16px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 0 10px rgb(0 0 0 / 50%);
            transform: translate(-50%, -50%);
          `}
        >
          <RadixDialog.Title
            className={css`
              margin-bottom: 8px;
              font-size: 1.2rem;
              color: #f00;
            `}
          >
            エラーが発生しました
          </RadixDialog.Title>
          <RadixDialog.Description
            className={css`
              margin-bottom: 8px;
              margin-left: 8px;
            `}
          >
            {description}
          </RadixDialog.Description>
          <div
            className={css`
              display: flex;
              justify-content: flex-end;
            `}
          >
            <RadixDialog.Close asChild>
              <button
                aria-label="ダイアログを閉じる"
                className={css`
                  padding: 8px;
                  color: white;
                  cursor: pointer;
                  background-color: t("colors.primary");
                  border: none;
                  border-radius: 4px;

                  &:focus-visible {
                    outline: 2px solid t("colors.secondary");
                  }
                `}
                onClick={() => onOpenChange(false)}
              >
                閉じる
              </button>
            </RadixDialog.Close>
          </div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
