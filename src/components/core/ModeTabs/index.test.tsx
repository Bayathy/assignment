import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, expect, it } from 'vitest'
import { ModeTabs } from '.'

beforeEach(() => {
  const totalGraph = <p>Total Graph</p>
  const juniorsGraph = <div>Juniors Graph</div>
  const workingGraph = <div>Working Graph</div>
  const oldGraph = <div>Old Graph</div>

  render(<ModeTabs totalGraph={totalGraph} juniorsGraph={juniorsGraph} workingGraph={workingGraph} oldGraph={oldGraph} />)
})

it('タブのトリガーが表示される', () => {
  expect(screen.getByText('全体')).toBeTruthy()
  expect(screen.getByText('年少人口')).toBeTruthy()
  expect(screen.getByText('生産年齢人口')).toBeTruthy()
  expect(screen.getByText('老年人口')).toBeTruthy()
})

it('タブのコンテンツが切り替えできるされる', async () => {
  const [_totalTrigger, juniorTrigger, _workingTrigger, _oldTrigger] = screen.getAllByRole('tab')

  await fireEvent.mouseDown(juniorTrigger)

  expect(screen.getByText('Juniors Graph')).toBeTruthy()
})
