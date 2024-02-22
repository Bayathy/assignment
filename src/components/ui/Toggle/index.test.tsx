import { fireEvent, render, screen } from '@testing-library/react'
import { Toggle } from '.'

it('押した状態のonとoffを切り替えられる', async () => {
  render(<Toggle />)

  const toggle = screen.getByRole('button')

  expect(toggle).toHaveAttribute('aria-pressed', 'false')

  await fireEvent.click(toggle)

  expect(toggle).toHaveAttribute('aria-pressed', 'true')
})

it('押した時にonClick要素がよばれる', async () => {
  const onClick = vi.fn()

  render(<Toggle onClick={onClick} />)

  const toggle = screen.getByRole('button')

  await fireEvent.click(toggle)

  expect(onClick).toBeCalled()
})
