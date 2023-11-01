type QueryParamsObject = { [key: string]: string | string[] | number | boolean }

export function stringify(obj: QueryParamsObject = {}): string {
  const queryParams = Object.entries(obj).map(([key, rawValue]) => {
    const value = String(rawValue)
    return `${key}=${encodeURIComponent(value)}`
  })
  return queryParams.length ? `?${queryParams.join('&')}` : ''
}
