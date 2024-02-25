import { renderHook } from '@testing-library/react-hooks'
import { useMediaQuery } from './useMediaQuery'

it('指定したメディアクエリにマッチするかどうかを返す', () => {
  const mockMatchMedia = (query: string) => {
    return {
      matches: query === '(max-width: 768px)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }
  }

  window.matchMedia = vi.fn().mockImplementation(mockMatchMedia)

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  )

  const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'), {
    wrapper,
  })
  expect(result.current).toBe(true)
})
