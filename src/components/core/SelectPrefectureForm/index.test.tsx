import { fireEvent, render, screen } from '@testing-library/react'
import { prefectures } from '../../../mocks/data/prefectures'
import { SelectPrefectureForm } from '.'

it('正しい数のToggleがレンダリングされる', () => {
  render(
    <SelectPrefectureForm
      handleSelectPrefecture={() => () => {}}
      prefectures={prefectures.result}
      selectedPrefectures={[]}
    />,
  )

  const checkbox = screen.getAllByRole('checkbox')

  expect(checkbox).toHaveLength(prefectures.result.length)
})

it('選択された都道府県のCheckboxがcheckedになる', async () => {
  const selectPrefecture = prefectures.result

  render(
    <SelectPrefectureForm
      handleSelectPrefecture={() => () => {}}
      prefectures={prefectures.result}
      selectedPrefectures={[selectPrefecture[0]]}
    />,
  )

  const checkbox = screen.getAllByRole('checkbox')

  fireEvent.click(checkbox[0])

  expect(checkbox[0]).toHaveAttribute('aria-checked', 'true')
})

it('選択されていない都道府県のToggleがcheckedにならない', async () => {
  const selectPrefecture = prefectures.result

  render(
    <SelectPrefectureForm
      handleSelectPrefecture={() => () => {}}
      prefectures={selectPrefecture}
      selectedPrefectures={[selectPrefecture[0]]}
    />,
  )

  const checkbox = screen.getAllByRole('checkbox')

  fireEvent.click(checkbox[0])

  expect(checkbox[1]).toHaveAttribute('aria-checked', 'false')
})

it('toggleを押すとhandleSelectPrefectureが呼ばれる', async () => {
  const handleSelectPrefecture = vi.fn()
  const selectPrefecture = prefectures.result

  render(
    <SelectPrefectureForm
      handleSelectPrefecture={() => handleSelectPrefecture}
      prefectures={selectPrefecture}
      selectedPrefectures={[selectPrefecture[0]]}
    />,
  )

  const checkbox = screen.getAllByRole('checkbox')

  fireEvent.click(checkbox[0])

  expect(handleSelectPrefecture).toHaveBeenCalled()
})
