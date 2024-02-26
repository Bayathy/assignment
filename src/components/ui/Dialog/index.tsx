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
              outline-color: t("colors.secondary");
              outline-offset: 2px;
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
            width: 90%;
            height: 90%;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 0 10px rgb(0 0 0 / 50%);
            transform: translate(-50%, -50%);
          `}
        >
          <div
            className={css`
              display: grid;
            `}
          >
            <div
              className={css`
                display: flex;
                justify-content: flex-end;
                padding: 8px;
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
                >
                  閉じる
                </button>
              </RadixDialog.Close>
            </div>
            <RadixScrollArea.Root
              className={css`
                width: 100%;
                height: 100%;
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
                  padding: 2px;
                  user-select: none;
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
                    position: relative;
                    flex: 1;
                    background-color: white;
                    border-radius: 16px;

                    &::before {
                      position: absolute;
                      top: 50%;
                      left: 50%;
                      width: 100%;
                      min-width: 16px;
                      height: 100%;
                      min-height: 16px;
                      content: "";
                      transform: translate(-50%, -50%);
                    }
                  `}
                />
              </RadixScrollArea.Scrollbar>
            </RadixScrollArea.Root>
          </div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
