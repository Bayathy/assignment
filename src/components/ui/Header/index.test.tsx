import { render } from '@testing-library/react'
import { expect, it } from 'vitest'
import { Header } from '.'

it('タイトルが表示される', () => {
  render(<Header />)

  expect(document.querySelector('h1')?.textContent).toBe('日本の人口推移')
})
