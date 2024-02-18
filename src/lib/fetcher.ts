/**
 * SWR用のfetcher関数
 *
 */

import { errorHandler } from './errorHandler'

export async function fetcher(url: string) {
  const res = await fetch(url, { headers: { 'X-API-KEY': import.meta.env.VITE_RESAS_API_KEY } })

  const body = await res.json()

  if (body.status !== 200) {
    const error = errorHandler(Number(body.statusCode))

    throw error
  }

  return body
}
