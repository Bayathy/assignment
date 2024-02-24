import useSWR from 'swr'
import type { PrefectureResponse } from '../model/prefecture'
import { fetcher } from '../lib/fetcher'
import type { HandledError } from '../lib/errorHandler'

/**
 * 都道府県一覧を取得する
 * @returns
 */

export function usePrefectures() {
  const { data, isLoading, error } = useSWR<PrefectureResponse, HandledError>(`${import.meta.env.VITE_API_URL}/prefectures`, fetcher)

  if (data?.result === undefined) {
    return {
      prefectures: undefined,
      isLoading,
      error,
    }
  }

  const prefectures = data.result

  return {
    prefectures,
    isLoading,
    error,
  }
}
