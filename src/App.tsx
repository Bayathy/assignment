import { ModeTabs } from './components/core/ModeTabs'
import { SelectPrefectureForm } from './components/core/SelectPrefectureForm'

function App() {
  return (
    <div>
      <SelectPrefectureForm />
      <ModeTabs
        totalGraph={<div>全体のグラフ</div>}
        juniorsGraph={<div>年少人口のグラフ</div>}
        workingGraph={<div>生産年齢人口のグラフ</div>}
        oldGraph={<div>老年人口のグラフ</div>}
      />
    </div>
  )
}

export default App
