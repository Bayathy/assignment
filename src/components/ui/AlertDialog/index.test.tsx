import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { AlertDialog } from '.'

it('open=falseの時に表示されない', () => {
  render(
    <AlertDialog open={false} description="エラーが発生しました" onOpenChange={() => {}} />,
  )

  expect(screen.queryByText('エラーが発生しました')).toBeNull()
})

it('open=trueの時に表示される', () => {
  render(
    <AlertDialog open description="エラーが発生しました" onOpenChange={() => {}} />,
  )

  expect(screen.getByRole('dialog')).toBeTruthy()
})
