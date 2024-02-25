import { useQueries } from '@tanstack/react-query'
import type { Population, PopulationResponse } from '../model/population'

import type { Prefecture } from '../model/prefecture'
import { fetcher } from '../lib/fetcher'

/**
 * 都道府県にに対応する人口を取得する
 * @param prefectureList
 * @returns
 */

export function usePopulations(prefectureList: Prefecture[]) {
  const populationQueries = useQueries<PopulationResponse[]>(
    {
      queries: prefectureList.map(prefecture => ({
        queryKey: ['population', prefecture.prefCode],
        queryFn: () => {
          return fetcher<PopulationResponse>(`${import.meta.env.VITE_API_URL}/population/composition/perYear?prefCode=${prefecture.prefCode}`).then((data) => {
            return {
              prefName: prefecture.prefName,
              data: data.result.data,
            }
          })
        },
      })),
    },
  )

  const err = populationQueries.find(query => query.error)?.error

  return {
    populations: !err ? populationQueries.map(query => query.data as Population) : undefined,
    isLoading: populationQueries.some(query => query.isLoading),
    error: err ?? null,
  }
}
