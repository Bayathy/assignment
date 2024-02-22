import { css } from '@kuma-ui/core'
import { Chart } from './components/core/Chart'
import { SelectPrefectureForm } from './components/core/SelectPrefectureForm'
import { Header } from './components/ui/Header'
import { population } from './mocks/data/population'
import { ModeTabs } from './components/core/ModeTabs'

function App() {
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
      `}
      >
        <ModeTabs totalGraph={<div>Total Graph</div>} juniorsGraph={<div>Juniors Graph</div>} workingGraph={<div>Working Graph</div>} oldGraph={<div>Old Graph</div>} />
        <SelectPrefectureForm />
        <Chart populations={[
          {
            label: '東京都',
            data: population[0].result.data[0].data,
          },
          {
            label: '大阪府',
            data: population[1].result.data[0].data,
          },
        ]}
        />
      </main>
    </div>
  )
}

export default App
