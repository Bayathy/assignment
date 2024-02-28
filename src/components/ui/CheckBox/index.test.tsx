import { fireEvent, render, screen } from '@testing-library/react'
import { Checkbox } from '.'

it('押した時にcheckboxのdata-stateが変わる', () => {
  render(<Checkbox>test</Checkbox>)
  const checkbox = screen.getByRole('checkbox')
  expect(checkbox).toHaveAttribute('data-state', 'unchecked')
  fireEvent.click(checkbox)
  expect(checkbox).toHaveAttribute('data-state', 'checked')
})

it('押した時にonChangeが呼ばれる', () => {
  const mockFn = vi.fn()
  render(<Checkbox onCheckedChange={mockFn}>test</Checkbox>)
  const checkbox = screen.getByRole('checkbox')
  fireEvent.click(checkbox)
  expect(mockFn).toBeCalled()
})
