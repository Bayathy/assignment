import { css } from '@kuma-ui/core'
import { useCallback, useState } from 'react'
import { Chart } from './components/core/Chart'
import { SelectPrefectureForm } from './components/core/SelectPrefectureForm'
import { ModeTabs } from './components/core/ModeTabs'
import { usePrefectures } from './hooks/usePrefectures'
import type { Prefecture } from './model/prefecture'
import { useMediaQuery } from './hooks/useMediaQuery'
import { Dialog } from './components/ui/Dialog'

function App() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  const { prefectures } = usePrefectures()
  const [selectedPrefectures, setSelectedPrefectures] = useState<Prefecture[]>(
    [],
  )

  const toggleSelectPrefecture
  = useCallback((checked: boolean) => (selectPrefecture: Prefecture) => {
    const newList = checked
      ? [selectPrefecture, ...selectedPrefectures]
      : selectedPrefectures.filter(
        prefecture => prefecture.prefCode !== selectPrefecture.prefCode,
      )

    setSelectedPrefectures(newList)
  }, [selectedPrefectures])

  return (
    <main
      className={css`
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: 100%;
        max-width: 1200px;
        padding-inline: 16px;
        margin-inline: auto;
      `}
    >
      {prefectures
      && (isMobile
        ? (
          <Dialog triggerText="都道府県の選択">
            <SelectPrefectureForm
              prefectures={prefectures}
              handleSelectPrefecture={toggleSelectPrefecture}
              selectedPrefectures={selectedPrefectures}
            />
          </Dialog>
          )
        : (
          <SelectPrefectureForm
            prefectures={prefectures}
            selectedPrefectures={selectedPrefectures}
            handleSelectPrefecture={toggleSelectPrefecture}
          />
          ))}
      {selectedPrefectures?.length !== 0
        ? (
          <ModeTabs
            totalGraph={
              <Chart mode="total" prefecturesList={selectedPrefectures} />
          }
            juniorsGraph={
              <Chart mode="juniors" prefecturesList={selectedPrefectures} />
          }
            workingGraph={
              <Chart mode="working" prefecturesList={selectedPrefectures} />
          }
            oldGraph={<Chart mode="old" prefecturesList={selectedPrefectures} />}
          />
          )
        : (
          <p
            className={css`
            margin-top: 16px;
            font-size: 1.2rem;
            text-align: center;
          `}
          >
            都道府県を選択してください
          </p>
          )}
    </main>
  )
}

export default App
