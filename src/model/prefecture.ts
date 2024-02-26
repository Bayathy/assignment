/**
 * Prefecture Responseを整形した後の型
 */

export interface Prefecture {
  prefCode: number
  prefName: string
}

/**
 * 都道府県のAPIレスポンスの型
 */
export interface PrefectureResponse {
  message: string
  result: Prefecture[]
}
