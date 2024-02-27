import { fireEvent, render, screen } from '@testing-library/react'
import { prefectures } from '../../../mocks/data/prefectures'
import { SelectPrefectureForm } from '.'

it('正しい数のToggleがレンダリングされる', () => {
  const selectPrefecture = prefectures.result

  render(
    <SelectPrefectureForm
      handleSelectPrefecture={() => () => {}}
      selectPrefectures={[]}
      prefectures={selectPrefecture}
    />,
  )

  const toggles = screen.getAllByRole('button')

  expect(toggles).toHaveLength(selectPrefecture.length)
})

it('選択された都道府県のToggleがpressedになる', () => {
  const selectPrefecture = prefectures.result

  render(
    <SelectPrefectureForm
      handleSelectPrefecture={() => () => {}}
      selectPrefectures={[selectPrefecture[0]]}
      prefectures={selectPrefecture}
    />,
  )

  const toggles = screen.getAllByRole('button')

  expect(toggles[0]).toHaveAttribute('aria-pressed', 'true')
})

it('選択されていない都道府県のToggleがpressedにならない', () => {
  const selectPrefecture = prefectures.result

  render(
    <SelectPrefectureForm
      handleSelectPrefecture={() => () => {}}
      selectPrefectures={[selectPrefecture[0]]}
      prefectures={selectPrefecture}
    />,
  )

  const toggles = screen.getAllByRole('button')

  expect(toggles[1]).toHaveAttribute('aria-pressed', 'false')
})

it('toggleを押すとhandleSelectPrefectureが呼ばれる', async () => {
  const handleSelectPrefecture = vi.fn()
  const selectPrefecture = prefectures.result

  render(
    <SelectPrefectureForm
      handleSelectPrefecture={() => handleSelectPrefecture}
      selectPrefectures={[]}
      prefectures={selectPrefecture}
    />,
  )

  const toggles = screen.getAllByRole('button')

  await fireEvent.click(toggles[0])

  expect(handleSelectPrefecture).toHaveBeenCalled()
})
