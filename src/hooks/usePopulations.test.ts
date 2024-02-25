import { it } from 'vitest'
import { renderHook } from '@testing-library/react-hooks'
import { rest } from 'msw'
import { TestQueryProvider } from '../components/provider/TestQueryProvider'
import { server } from '../mocks/server'
import { population } from '../mocks/data/population'
import { usePopulations } from './usePopulations'

const testPrefectureList = [
  { prefCode: 1, prefName: '北海道' },
  { prefCode: 2, prefName: '青森県' },
]

it('ローディング状態', async () => {
  const { result } = renderHook(() => usePopulations(testPrefectureList), {
    wrapper: TestQueryProvider,
  })

  expect(result.current).toEqual({
    populations: [],
    isLoading: true,
    error: null,
  })
})

it('データ取得後のテスト', async () => {
  server.use(
    rest.get(
      `${import.meta.env.VITE_API_URL}/population/composition/perYear`,
      (req, res, ctx) => {
        const url = new URL(req.url)

        const prefCode = Number(url.searchParams.get('prefCode'))

        return res(ctx.status(200), ctx.json(population[prefCode - 1]))
      },
    ),
  )

  const { result, waitForNextUpdate } = renderHook(
    () => usePopulations(testPrefectureList),
    { wrapper: TestQueryProvider },
  )

  await waitForNextUpdate()

  expect(result.current).toEqual({
    populations: [
      {
        prefName: '北海道',
        data: {
          total: population[0].result.data[0].data,
          juniors: population[0].result.data[1].data,
          working: population[0].result.data[2].data,
          old: population[0].result.data[3].data,
        },
      },
      {
        prefName: '青森県',
        data: {
          total: population[1].result.data[0].data,
          juniors: population[1].result.data[1].data,
          working: population[1].result.data[2].data,
          old: population[1].result.data[3].data,
        },
      },
    ],
    isLoading: false,
    error: null,
  })
})

it('エラー発生時のテスト', async () => {
  server.use(
    rest.get(
      `${import.meta.env.VITE_API_URL}/population/composition/perYear`,
      (_req, res, ctx) => {
        return res(
          ctx.status(403),
          ctx.json({
            statusCode: '403',
            message: 'Forbidden.',
            description: '',
          }),
        )
      },
    ),
  )

  vi.mock('../lib/errorHandler', () => {
    return {
      errorHandler: vi.fn().mockReturnValue(new Error('test Error')),
    }
  })

  const { result, waitForNextUpdate } = renderHook(
    () => usePopulations(testPrefectureList),
    { wrapper: TestQueryProvider },
  )

  await waitForNextUpdate()

  expect(result.current).toEqual({
    populations: [],
    isLoading: false,
    error: new Error('test Error'),
  })
})
