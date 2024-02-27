import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { Dialog } from '.'

it('通常状態でダイアログが表示されない', () => {
  render(
    <Dialog triggerText="testTriggerText">
      <div>ダイアログの中身</div>
    </Dialog>,
  )

  expect(screen.queryByRole('dialog')).toBeNull()
})

it('triggerのTextが正しく表示される', async () => {
  render(
    <Dialog triggerText="testTriggerText">
      <div>ダイアログの中身</div>
    </Dialog>,
  )

  const trigger = screen.getByRole('button')

  expect(trigger).toHaveTextContent('testTriggerText')
})

it('triggerを押すとダイアログが表示される', async () => {
  render(
    <Dialog triggerText="testTriggerText">
      <div>ダイアログの中身</div>
    </Dialog>,
  )

  const trigger = screen.getByRole('button')

  await fireEvent.click(trigger)
  expect(screen.getByRole('dialog')).toBeTruthy()
})

it('ダイアログを閉じるボタンが押すとdialogが閉じる', async () => {
  render(
    <Dialog triggerText="testTriggerText">
      <div>ダイアログの中身</div>
    </Dialog>,
  )

  const openTrigger = screen.getByRole('button')

  await fireEvent.click(openTrigger)

  const closeTrigger = screen.getByRole('button')

  await fireEvent.click(closeTrigger)

  expect(screen.queryByRole('dialog')).toBeNull()
})
