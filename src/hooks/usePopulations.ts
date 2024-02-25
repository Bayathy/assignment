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
  const populationQueries = useQueries<PopulationResponse[]>({
    queries: prefectureList.map(prefecture => ({
      queryKey: ['population', prefecture.prefCode],
      queryFn: () => {
        return fetcher<PopulationResponse>(
          `${import.meta.env.VITE_API_URL}/population/composition/perYear?prefCode=${prefecture.prefCode}`,
        ).then((data) => {
          const filterResult = data.result.data.map((data) => {
            return {
              mode:
                data.label === '総人口'
                  ? 'totals'
                  : data.label === '年少人口'
                    ? 'juniors'
                    : data.label === '生産年齢人口'
                      ? 'working'
                      : 'old',
              data: data.data,
            }
          })

          return {
            prefName: prefecture.prefName,
            data: {
              total: filterResult.find(data => data.mode === 'totals')?.data,
              juniors: filterResult.find(data => data.mode === 'juniors')
                ?.data,
              working: filterResult.find(data => data.mode === 'working')
                ?.data,
              old: filterResult.find(data => data.mode === 'old')?.data,
            },
          }
        })
      },
    })),
  })

  const err = populationQueries.find(query => query.error)?.error
  const isLoading = populationQueries.some(query => query.isLoading)

  return {
    populations:
      !err && !isLoading
        ? populationQueries.map(query => query.data as Population)
        : [],
    isLoading,
    error: err ?? null,
  }
}
