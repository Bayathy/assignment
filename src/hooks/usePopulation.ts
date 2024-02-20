import useSWR from 'swr'
import { fetcher } from '../lib/fetcher'

/**
 * prefCodeに対応する都道府県の人口を取得する
 * @param prefCode
 * @returns
 */

export async function usePopulation(prefCode: number) {
  const { data, isLoading, error } = useSWR(`${import.meta.env.VITE_API_URL}/population/composition/perYear?cityCode=-&prefCode=${prefCode}`, fetcher)
  const population = data?.result

  return {
    population,
    isLoading,
    error,
  }
}
