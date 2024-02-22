import { useCallback, useState } from 'react'
import { css } from '@kuma-ui/core'
import { usePrefectures } from '../../../hooks/usePrefectures'

import { Toggle } from '../../ui/Toggle'

export function SelectPrefectureForm() {
  const { prefectures } = usePrefectures()
  const [_selectedPrefectures, setSelectedPrefectures] = useState<number[]>()

  const handleSelectPrefecture = useCallback((prefCode: number) => {
    setSelectedPrefectures(prev => prev?.includes(prefCode) ? prev.filter(p => p !== prefCode) : [...(prev || []), prefCode])
  }, [])

  if (!prefectures)
    return null

  return (
    <form>
      <fieldset>
        <legend className={css`
          font-size: 1.2rem;
        `}
        >
          都道府県データを選択
        </legend>
        <div className={css`
          margin-top: 16px;
          display: grid;
          gap: 8px;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      `}
        >
          {prefectures.map(prefecture => (
            <Toggle
              key={prefecture.prefName}
              className={css`
              width:fit-content;
              height:fit-content;
            `}
              onClick={() => handleSelectPrefecture(prefecture.prefCode)}
            >
              {prefecture.prefName}
            </Toggle>
          ))}
        </div>
      </fieldset>
    </form>
  )
}
