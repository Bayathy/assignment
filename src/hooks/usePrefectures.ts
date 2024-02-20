import useSWR from 'swr'
import type { Prefecture } from '../model/prefecture'
import { fetcher } from '../lib/fetcher'

/**
 * 都道府県一覧を取得する
 * @returns
 */

export function usePrefectures() {
  const { data, isLoading, error } = useSWR<Prefecture>(`${import.meta.env.VITE_API_URL}/prefectures`, fetcher)

  const prefectures = data?.result

  return {
    prefectures,
    isLoading,
    error,
  }
}
