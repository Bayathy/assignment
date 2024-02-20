import { rest } from 'msw'

export const handlers = [
  rest.get('/users', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{ id: 1, name: 'John' }]))
  }),
]
