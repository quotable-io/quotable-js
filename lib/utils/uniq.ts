/**
 * Returns an array containing only uniq members of the given array
 * @param arr
 * @returns
 */
export function uniq<T = any>(arr: T[]): T[] {
  if (Array.isArray(arr)) {
    return Array.from(new Set(arr))
  }
  return []
}
