import useSWR from 'swr'
import { apiUrl } from '../lib/CONSTANT'
import type { Prefecture } from '../model/prefecture'
import { fetcher } from '../lib/fetcher'

/**
 * 都道府県一覧を取得する
 * @returns
 */

export function getPrefectures() {
  const { data, isLoading, error } = useSWR<Prefecture>(`${apiUrl}/api/v1/prefectures`, fetcher)

  return {
    data,
    isLoading,
    error,
  }
}
