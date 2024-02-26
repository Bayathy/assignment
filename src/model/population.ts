/**
 * 人口データの種類を分けるための型
 */
export type PopulationTyoes = 'total' | 'working' | 'juniors' | 'old'

/**
 * 人口データの型、データの種類別にデータを持つ
 */
export interface Population {
  prefName: string
  data: {
    [key in PopulationTyoes]: {
      year: number
      value: number
    }[];
  }
}

/**
 * 人口データのAPIレスポンスの型
 */
export interface PopulationResponse {
  message: string
  result: {
    boundaryYear: number
    data: {
      label: string
      data: {
        year: number
        value: number
      }[]
    }[]
  }
}
