export function getErrorMessage(error: unknown, fallback = '發生錯誤'): string {
  // 原生 Error 或網路錯誤
  if (error instanceof Error) {
    if (error.message === 'Network Error') return '無法連線到伺服器，請稍後再試'
    return error.message
  }

  // 字串型態
  if (typeof error === 'string') return error

  return fallback
}
