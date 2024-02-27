import { generateRandomColor } from './generateRandomColor'

it('指定した形式でカラーコードが返される', () => {
  // Math.rondomeをモック化
  vi.spyOn(Math, 'random').mockReturnValue(0.5)

  const color = generateRandomColor()

  expect(color).toBe('hsl(180, 70%, 50%)')
})
