import { rest } from 'msw'
import { prefectures } from './data/prefectures'

export const handlers = [
  rest.get('/api', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'hello world',
      }),
    )
  }),

  rest.get(`${import.meta.env.VITE_API_URL}/prefectures`, (req, res, ctx) => {
    if (!req.headers.has('X-API-KEY')) {
      return res(
        ctx.status(200),
        ctx.json({ statusCode: '403', message: 'Forbidden.', description: '' }),
      )
    }

    return res(
      ctx.status(200),
      ctx.json(prefectures),
    )
  }),
]
