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
        <RadixDialog.Overlay className={css`
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1000;
        `}
        />
        <RadixDialog.Content className={
          css`
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 16px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            z-index: 1001;
            max-width: 320px;
            width: 100%;
          `
        }
        >
          <RadixDialog.Title className={
            css`
              font-size: 1.2rem;
              margin-bottom: 8px;
              color: #ff0000;
            `
          }
          >
            エラーが発生しました
          </RadixDialog.Title>
          <RadixDialog.Description className={
            css`
              margin-bottom: 8px;
              margin-left: 8px;
            `
          }
          >
            {description}
          </RadixDialog.Description>
          <div className={css`
            display: flex;
            justify-content: flex-end;
          `}
          >
            <RadixDialog.Close asChild>
              <button
                aria-label="ダイアログを閉じる"
                className={
              css`
                padding: 8px;
                background-color: t("colors.primary");
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                &:focus-visible {
                  outline: 2px solid t("colors.secondary");
                }
              `
            }
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
