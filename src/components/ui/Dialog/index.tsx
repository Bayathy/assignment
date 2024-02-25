import { css } from '@kuma-ui/core'
import * as RadixDialog from '@radix-ui/react-dialog'
import * as RadixScrollArea from '@radix-ui/react-scroll-area'

interface Props {
  triggerText: string
  children: React.ReactNode
}

export const Dialog: React.FC<Props> = ({ triggerText, children }) => {
  return (
    <RadixDialog.Root>
      <RadixDialog.Trigger asChild>
        <button
          aria-label="ダイアログのオープン"
          className={css`
            padding: 8px 16px;
            border-radius: 4px;
            outline: 2px solid t("colors.primary");
            &:focus-visible {
              outline-offset: 2px;
              outline-color: t("colors.secondary");
            }
          `}
        >
          {triggerText}
        </button>
      </RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay
          className={css`
            position: fixed;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1000;
          `}
        />
        <RadixDialog.Content
          className={css`
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            z-index: 1001;
            width: 90%;
            height: 90%;
          `}
        >
          <div
            className={css`
                display: flex;
                justify-content: flex-end;
                height: 10%;
                padding: 8px;
              `}
          >
            <RadixDialog.Close asChild>
              <button
                aria-label="ダイアログを閉じる"
                className={css`
                    padding: 8px;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    background-color: t("colors.primary");
                    &:focus-visible {
                      outline: 2px solid t("colors.secondary");
                    }
                  `}
              >
                閉じる
              </button>
            </RadixDialog.Close>
          </div>
          <RadixScrollArea.Root
            className={css`
                height: 100%;
                width: 100%;
                overflow: hidden;
              `}
          >
            <RadixScrollArea.Viewport
              className={css`
                  width: inherit;
                  height: 90%;
                  padding: 16px;
                `}
            >
              {children}
            </RadixScrollArea.Viewport>
            <RadixScrollArea.Scrollbar
              className={css`
                  display: flex;
                  user-select: none;
                  padding: 2px;
                  background-color: gray;
                  transition: background-color 0.2s;
                  [data-orientation="horizontal"] {
                    flex-direction: column;
                    height: 12px;
                  }
                `}
              orientation="vertical"
            >
              <RadixScrollArea.Thumb
                className={css`
                    flex: 1;
                    background-color: white;
                    border-radius: 16px;
                    position: relative;
                    &::before {
                      content: "";
                      position: absolute;
                      top: 50%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                      width: 100%;
                      height: 100%;
                      min-height: 16px;
                      min-width: 16px;
                    }
                  `}
              />
            </RadixScrollArea.Scrollbar>
          </RadixScrollArea.Root>

        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
