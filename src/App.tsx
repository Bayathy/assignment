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
    = (checked: boolean) => (selectPrefecture: Prefecture) => {
      const newList = checked
        ? [selectPrefecture, ...selectedPrefectures]
        : selectedPrefectures.filter(
          prefecture => prefecture.prefCode !== selectPrefecture.prefCode,
        )

      setSelectedPrefectures(newList)
    }

  return (
    <div
      className={css`
        display: grid;
        grid-template-rows: auto 1fr;
        grid-template-columns: 100%;
        gap: 16px;
        min-height: 100vh;
      `}
    >
      <Header />
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
              oldGraph={
                <Chart mode="old" prefecturesList={selectedPrefectures} />
            }
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
    </div>
  )
}

export default App
