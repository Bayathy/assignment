import { expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react-hooks'
import { rest } from 'msw'
import { SwrTestProvider } from '../components/provider/SWRTestProvider'
import { server } from '../mocks/server'
import { population } from '../mocks/data/population'
import { usePopulation } from './usePopulation'

it('ローディング状態のテスト', async () => {
  const { result } = renderHook(() => usePopulation(1), { wrapper: SwrTestProvider })
  expect(result.current).toEqual({
    population: undefined,
    error: undefined,
    isLoading: true,
  })
})

it('データ取得後のテスト', async () => {
  server.use(
    rest.get(`${import.meta.env.VITE_API_URL}/population/composition/perYear`, (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(population[1]),
      )
    }),
  )

  const { result, waitForNextUpdate } = renderHook(() => usePopulation(1), { wrapper: SwrTestProvider })
  await waitForNextUpdate()

  expect(result.current).toEqual({
    population: population[1].result,
    error: undefined,
    isLoading: false,
  })
})

it('エラー発生時のテスト', async () => {
  server.use(
    rest.get(`${import.meta.env.VITE_API_URL}/population/composition/perYear`, (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ statusCode: '403', message: 'Forbidden.', description: '' }),
      )
    }),
  )

  vi.mock('../lib/errorHandler', () => {
    return {
      errorHandler: vi.fn().mockReturnValue(new Error('test expect error')),
    }
  })

  const { result, waitForNextUpdate } = renderHook(() => usePopulation(1), { wrapper: SwrTestProvider })

  await waitForNextUpdate()

  expect(result.current).toEqual({
    population: undefined,
    error: new Error('test expect error'),
    isLoading: false,
  })
})
