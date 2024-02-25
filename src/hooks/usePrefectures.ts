import { useQuery } from '@tanstack/react-query'
import { fetcher } from '../lib/fetcher'
import type { PrefectureResponse } from '../model/prefecture'

/**
 * 都道府県一覧を取得する
 * @returns
 */

export function usePrefectures() {
  const { data, error, isLoading } = useQuery<PrefectureResponse>({
    queryKey: ['prefectures'],
    queryFn: async () => {
      return await fetcher<PrefectureResponse>(`${import.meta.env.VITE_API_URL}/prefectures`)
    },
  })

  return {
    prefectures: data?.result ?? [],
    isLoading,
    error,
  }
}
