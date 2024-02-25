/**
 * SWR用のfetcher関数
 *
 */

import { errorHandler } from './errorHandler'

export async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { 'X-API-KEY': import.meta.env.VITE_RESAS_API_KEY } })

  const body = await res.json()

  if (body.statusCode) {
    const error = errorHandler(Number(body.statusCode))
    throw error
  }

  return body
}
