import useSWR from 'swr'

import { useCallback } from 'react'
import type { Population } from '../model/population'

import type { Prefecture } from '../model/prefecture'
import type { HandledError } from '../lib/errorHandler'
import { fetcher } from '../lib/fetcher'

async function requestHandler(prefectureList: Prefecture[]) {
  const requests = prefectureList.map((prefecture) => {
    return async () => {
      try {
        const response = await fetcher(`${import.meta.env.VITE_API_URL}/population/composition/perYear?prefCode=${prefecture.prefCode}`)
        return {
          prefName: prefecture.prefName,
          data: response.result.data,
        } as Population
      }
      catch (error) {
        console.error(error)
        throw error
      }
    }
  })

  try {
    const response = await Promise.all(requests.map(request => request()))
    return response
  }
  catch (error) {
    console.error(error)
    throw error // Promise.all 内でのエラーハンドリング
  }
}
/**
 * prefCodeに対応する都道府県の人口を取得する
 * @param prefCode
 * @returns
 */

export function usePopulations() {
  const { data, error, mutate } = useSWR<Population[], HandledError>(`${import.meta.env.VITE_API_URL}/population/composition/perYear`)
  const fetchPopulation = useCallback((prefectureList: Prefecture[]) => {
    mutate(async () => {
      return await requestHandler(prefectureList)
    }).catch((error) => {
      console.error(error)
      throw error
    },
    )
  }, [mutate])

  return {
    populations: data,
    isLoding: !data && !error,
    error,
    fetchPopulation,
  }
}
