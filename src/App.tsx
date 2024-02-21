import { Chart } from './components/core/Chart'
import { population } from './mocks/data/population'

function App() {
  return (
    <div>
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
    </div>
  )
}

export default App
