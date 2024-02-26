/**
 * エラーハンドリング用の関数
 * APIの使用がエラーであっても常に200を返すため、拡張している
 */

export interface HandledError extends Error {
  status: number
  message: string
}

/**
 * HTTPステータスコードに応じたエラーメッセージを返す
 * @param httpStatus
 * @returns
 */

export function errorHandler(statusCode: number): HandledError {
  let error: HandledError

  switch (statusCode) {
    case 400:
      error = new Error('400 Bad Request') as HandledError
      error.status = 400
      error.message = '不正なリクエストです'
      break
    case 401:
      error = new Error('401 Unauthorized') as HandledError
      error.status = 401
      error.message = '認証が必要です'
      break
    case 403:
      error = new Error('403 Forbidden') as HandledError
      error.status = 403
      error.message = 'アクセスが拒否されました'
      break
    case 404:
      error = new Error('404 Not Found') as HandledError
      error.status = 404
      error.message = 'リソースが見つかりません'
      break
    case 500:
      error = new Error('500 Internal Server Error') as HandledError
      error.status = 500
      error.message = 'サーバーエラーが発生しました'
      break
    default:
      error = new Error('Unknown Error') as HandledError
      error.status = statusCode
      error.message = '不明なエラーが発生しました'
      break
  }

  return error
}
