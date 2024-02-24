import useSWR from 'swr'

import { useCallback } from 'react'
import type { Population, PopulationResponse } from '../model/population'

import { fetcher } from '../lib/fetcher'
import type { Prefecture } from '../model/prefecture'

async function requestHandler(prefectureList: Prefecture[]) {
  const requests = prefectureList.map(prefecture => fetcher(`${import.meta.env.VITE_API_URL}/population/composition/perYear?prefCode=${prefecture.prefCode}`)
    .then((res: PopulationResponse) => {
      return {
        prefName: prefecture.prefName,
        data: res.result.data,
      } as Population
    }))

  return Promise.all(requests)
}
/**
 * prefCodeに対応する都道府県の人口を取得する
 * @param prefCode
 * @returns
 */

export function usePopulations() {
  const { data, isLoading, error, mutate } = useSWR<Population[]>(`${import.meta.env.VITE_API_URL}/population/composition/perYear`)
  const fetchPopulation = useCallback((prefectureList: Prefecture[]) => {
    mutate(requestHandler(prefectureList))
  }, [mutate])

  if (data === undefined) {
    return {
      populations: [],
      isLoading,
      fetchPopulation,
      error,
    }
  }

  return {
    populations: data,
    isLoading,
    error,
    fetchPopulation,
  }
}
