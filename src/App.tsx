import { css } from '@kuma-ui/core'
import { useState } from 'react'
import { Chart } from './components/core/Chart'
import { SelectPrefectureForm } from './components/core/SelectPrefectureForm'
import { Header } from './components/ui/Header'
import { ModeTabs } from './components/core/ModeTabs'
import { usePrefectures } from './hooks/usePrefectures'
import { usePopulations } from './hooks/usePopulations'
import type { Prefecture } from './model/prefecture'

function App() {
  const { prefectures } = usePrefectures()
  const [selectedPrefectures, setSelectedPrefectures] = useState<Prefecture[]>([])
  const { fetchPopulation } = usePopulations()

  const toggleSelectPrefecture = (pressed: boolean) =>
    (selectPrefecture: Prefecture) => {
      const newList = pressed ? [selectPrefecture, ...selectedPrefectures] : selectedPrefectures.filter(prefecture => prefecture.prefCode !== selectPrefecture.prefCode)

      setSelectedPrefectures(newList)
      fetchPopulation(newList)
    }

  return (
    <div className={css`
      min-height: 100vh;
      display: grid;
      grid-template-rows: auto 1fr;
      grid-template-columns: 100%;
      gap: 16px;
    `}
    >
      <Header />
      <main className={css`
        max-width:1200px;
        width:100%;
        margin-inline:auto;
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding-inline: 16px;
      `}
      >
        {prefectures
        && (
          <SelectPrefectureForm
            prefectures={prefectures}
            handleSelectPrefecture={toggleSelectPrefecture}
          />
        )}
        <ModeTabs totalGraph={<Chart mode="total" />} juniorsGraph={<Chart mode="juniors" />} workingGraph={<Chart mode="working" />} oldGraph={<Chart mode="old" />} />
      </main>
    </div>
  )
}

export default App
