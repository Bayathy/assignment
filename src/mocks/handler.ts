import { rest } from 'msw'
import { prefectures } from './data/prefectures'
import { population } from './data/population'

export const handlers = [
  rest.get(`${import.meta.env.VITE_API_URL}/prefectures`, (req, res, ctx) => {
    if (!req.headers.has('X-API-KEY')) {
      return res(
        ctx.status(200),
        ctx.json({ statusCode: '403', message: 'Forbidden.', description: '' }),
      )
    }

    return res(ctx.status(200), ctx.json(prefectures))
  }),

  rest.get(
    `${import.meta.env.VITE_API_URL}/population/composition/perYear`,
    (req, res, ctx) => {
      if (!req.headers.has('X-API-KEY')) {
        return res(
          ctx.status(200),
          ctx.json({
            statusCode: '403',
            message: 'Forbidden.',
            description: '',
          }),
        )
      }

      const prefCode = req.url.searchParams.get('prefCode')

      if (population.length < Number(prefCode))
        return res(ctx.status(200), ctx.json(population[0]))

      return res(ctx.status(200), ctx.json(population[Number(prefCode)]))
    },
  ),
]
