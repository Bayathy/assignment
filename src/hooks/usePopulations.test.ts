import { expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react-hooks'
import { rest } from 'msw'
import { act } from '@testing-library/react'
import { SwrTestProvider } from '../components/provider/SWRTestProvider'
import { server } from '../mocks/server'
import { population } from '../mocks/data/population'
import { usePopulations } from './usePopulations'

it('ローディング状態のテスト', async () => {
  const { result } = renderHook(() => usePopulations(), { wrapper: SwrTestProvider })
  expect(result.current).toEqual({
    populations: undefined,
    isLoding: true,
    error: undefined,
    fetchPopulation: expect.any(Function),
  })
})

it('データ取得後のテスト', async () => {
  server.use(
    rest.get(`${import.meta.env.VITE_API_URL}/population/composition/perYear`, (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(population[0]),
      )
    }),
  )

  const { result } = renderHook(() => usePopulations(), { wrapper: SwrTestProvider })
  result.current.fetchPopulation([{ prefCode: 1, prefName: '北海道' }])

  await act(async () => {
    await result.current.fetchPopulation([
      { prefCode: 1, prefName: '北海道' },
      { prefCode: 2, prefName: '青森県' },
    ])
  })

  expect(result.current).toEqual({
    populations: [{
      prefName: '北海道',
      data: population[0].result.data,
    }, {
      prefName: '青森県',
      data: population[0].result.data,

    }],
    isLoding: false,
    error: undefined,
    fetchPopulation: expect.any(Function),
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

  const { result } = renderHook(() => usePopulations(), { wrapper: SwrTestProvider })

  await act(async () => {
    await result.current.fetchPopulation([
      { prefCode: 1, prefName: '北海道' },
      { prefCode: 2, prefName: '青森県' },
    ])
  })

  expect(result.current).toEqual({
    populations: undefined,
    error: new Error('test expect error'),
    fetchPopulation: expect.any(Function),
  })
})
