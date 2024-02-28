import type { FC } from 'react'
import { css } from '@kuma-ui/core'

import type { Prefecture } from '../../../model/prefecture'
import { Checkbox } from '../../ui/CheckBox'

interface Props {
  handleSelectPrefecture: (
    pressed: boolean,
  ) => (selectPrefecture: Prefecture) => void
  prefectures: Prefecture[]
  selectedPrefectures: Prefecture[]
}

export const SelectPrefectureForm: FC<Props> = ({
  handleSelectPrefecture,
  prefectures,
  selectedPrefectures,
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
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
            gap: 16px;
            place-items: center;
            margin-top: 16px;
          `}
        >
          {prefectures.map((prefecture) => {
            return (
              <Checkbox
                aria-label={`${prefecture.prefName}を選択`}
                key={prefecture.prefName}
                checked={selectedPrefectures.some(
                  selectedPrefecture =>
                    selectedPrefecture.prefCode === prefecture.prefCode,
                )}
                onCheckedChange={(checked) => {
                  handleSelectPrefecture(!!checked)(prefecture)
                }}
              >
                {prefecture.prefName}
              </Checkbox>
            )
          })}
        </div>
      </fieldset>
    </form>
  )
}
