import { useEffect, useState } from 'react'

/**
 * メディアクエリを使用するためのカスタムフック
 * @example const isMobile = useMediaQuery('(max-width: 768px)')
 * @param {string} query
 * @returns {boolean} マッチしたかどうかの真偽値
 */
export function useMediaQuery(query: string) {
  const [value, setValue] = useState(false)

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches)
    }

    const result = matchMedia(query)
    result.addEventListener('change', onChange)
    setValue(result.matches)

    return () => result.removeEventListener('change', onChange)
  }, [query])

  return value
}
