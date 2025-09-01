export function getErrorMessage(error: unknown, fallback = '發生錯誤'): string {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  return fallback
}
