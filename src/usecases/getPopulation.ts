import useSWR from 'swr'
import { apiUrl } from '../lib/CONSTANT'
import { fetcher } from '../lib/fetcher'

/**
 * prefCodeに対応する都道府県の人口を取得する
 * @param prefCode
 * @returns
 */

export async function getPopulation(prefCode: number) {
  const { data, isLoading, error } = useSWR(`${apiUrl}/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`, fetcher)
  const population = data?.result

  return {
    population,
    isLoading,
    error,
  }
}
