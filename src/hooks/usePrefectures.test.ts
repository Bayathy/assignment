import { expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react-hooks'
import { rest } from 'msw'
import { SwrTestProvider } from '../components/provider/SWRTestProvider'
import { prefectures } from '../mocks/data/prefectures'
import { server } from '../mocks/server'
import { usePrefectures } from './usePrefectures'

it('ローディング状態のテスト', async () => {
  const { result } = renderHook(() => usePrefectures(), { wrapper: SwrTestProvider })
  expect(result.current).toEqual({
    data: undefined,
    error: undefined,
    isLoading: true,
  })
})

it('データ取得後のテスト', async () => {
  server.use(
    rest.get(`${import.meta.env.VITE_API_URL}/prefectures`, (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(prefectures),
      )
    }),
  )

  const { result, waitForNextUpdate } = renderHook(() => usePrefectures(), { wrapper: SwrTestProvider })

  await waitForNextUpdate()

  expect(result.current).toEqual({
    prefectures: prefectures.result,
    error: undefined,
    isLoading: false,
  })
})

it('エラー発生時のテスト', async () => {
  server.use(
    rest.get(`${import.meta.env.VITE_API_URL}/prefectures`, (_req, res, ctx) => {
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

  const { result, waitForNextUpdate } = renderHook(() => usePrefectures(), { wrapper: SwrTestProvider })

  await waitForNextUpdate()

  expect(result.current).toEqual({
    data: undefined,

    error: new Error('test expect error'),
    isLoading: false,
  })
})
