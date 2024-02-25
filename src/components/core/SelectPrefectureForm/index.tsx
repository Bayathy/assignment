import type { FC } from 'react'
import { css } from '@kuma-ui/core'

import { Toggle } from '../../ui/Toggle'
import type { Prefecture } from '../../../model/prefecture'

interface Props {
  handleSelectPrefecture: (
    pressed: boolean,
  ) => (selectPrefecture: Prefecture) => void
  selectPrefecture: Prefecture[]
  prefectures: Prefecture[]
}

export const SelectPrefectureForm: FC<Props> = ({
  handleSelectPrefecture,
  selectPrefecture,
  prefectures,
}) => {
  return (
    <form>
      <fieldset>
        <legend
          className={css`
            font-size: 1.2rem;
          `}
        >
          都道府県データを選択
        </legend>
        <div
          className={css`
            margin-top: 16px;
            display: grid;
            gap: 16px;
            place-items: center;
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          `}
        >
          {prefectures.map(prefecture => (
            <Toggle
              key={prefecture.prefName}
              className={css`
                width: 100%;
                height: fit-content;
              `}
              pressed={selectPrefecture.some(
                p => p.prefCode === prefecture.prefCode,
              )}
              onPressedChange={(pressed: boolean) =>
                handleSelectPrefecture(pressed)(prefecture)}
            >
              {prefecture.prefName}
            </Toggle>
          ))}
        </div>
      </fieldset>
    </form>
  )
}
