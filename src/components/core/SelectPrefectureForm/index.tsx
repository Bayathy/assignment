import { useCallback, useState } from 'react'
import { usePrefectures } from '../../../hooks/usePrefectures'
import { Checkbox } from '../../ui/Checkbox'

export function SelectPrefectureForm() {
  const { prefectures } = usePrefectures()
  const [selectedPrefectures, setSelectedPrefectures] = useState<number>(1)

  const handleSelectPrefecture = useCallback((prefCode: number) => {
    setSelectedPrefectures(prefCode)
  }, [])

  if (!prefectures)
    return null

  return (
    <form>
      <h1>都道府県を選択してください</h1>
      {prefectures.map(prefecture => (
        <label key={prefecture.prefCode}>
          <Checkbox
            checked={selectedPrefectures === prefecture.prefCode}
            onClick={() => handleSelectPrefecture(prefecture.prefCode)}
          />
          {prefecture.prefName}
        </label>
      ))}
    </form>
  )
}
