import { css } from '@kuma-ui/core'
import { useState } from 'react'
import { Chart } from './components/core/Chart'
import { SelectPrefectureForm } from './components/core/SelectPrefectureForm'
import { Header } from './components/ui/Header'
import { ModeTabs } from './components/core/ModeTabs'
import { usePrefectures } from './hooks/usePrefectures'
import type { Prefecture } from './model/prefecture'
import { usePopulations } from './hooks/usePopulations'
import { useMediaQuery } from './hooks/useMediaQuery'
import { Dialog } from './components/ui/Dialog'

function App() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  const { prefectures } = usePrefectures()
  const [selectedPrefectures, setSelectedPrefectures] = useState<Prefecture[]>(
    [],
  )
  // const { populations, isLoading } = usePopulations(selectedPrefectures)
  usePopulations(selectedPrefectures)

  const toggleSelectPrefecture
    = (pressed: boolean) => (selectPrefecture: Prefecture) => {
      const newList = pressed
        ? [selectPrefecture, ...selectedPrefectures]
        : selectedPrefectures.filter(
          prefecture => prefecture.prefCode !== selectPrefecture.prefCode,
        )

      setSelectedPrefectures(newList)
    }

  return (
    <div
      className={css`
        min-height: 100vh;
        display: grid;
        grid-template-rows: auto 1fr;
        grid-template-columns: 100%;
        gap: 16px;
      `}
    >
      <Header />
      <main
        className={css`
          max-width: 1200px;
          width: 100%;
          margin-inline: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-inline: 16px;
        `}
      >
        {prefectures
        && (isMobile
          ? (
            <Dialog triggerText="都道府県の選択">
              <SelectPrefectureForm
                prefectures={prefectures}
                selectPrefecture={selectedPrefectures}
                handleSelectPrefecture={toggleSelectPrefecture}
              />
            </Dialog>
            )
          : (
            <SelectPrefectureForm
              prefectures={prefectures}
              selectPrefecture={selectedPrefectures}
              handleSelectPrefecture={toggleSelectPrefecture}
            />
            ))}
        {selectedPrefectures?.length !== 0
          ? ((
            <ModeTabs
              totalGraph={<Chart mode="total" prefecturesList={selectedPrefectures} />}
              juniorsGraph={
                <Chart mode="juniors" prefecturesList={selectedPrefectures} />
              }
              workingGraph={
                <Chart mode="working" prefecturesList={selectedPrefectures} />
              }
              oldGraph={<Chart mode="old" prefecturesList={selectedPrefectures} />}
            />
            )
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
    </div>
  )
}

export default App
