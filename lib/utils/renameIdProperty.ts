type APIObject = {
  _id?: string
  id?: string
  results?: Array<{ _id?: string; id?: string }>
}

/**
 * Renamed the _id property on API objects to "id".
 * @param obj
 * @returns
 */
export function renameIdProperty(obj: APIObject | APIObject[]): any {
  if (Array.isArray(obj)) {
    return obj.map(renameIdProperty)
  }
  if (obj?._id) {
    const { _id, ...rest } = obj
    obj = { ...rest, id: _id }
  }
  if (Array.isArray(obj.results)) {
    obj.results = obj.results.map(renameIdProperty)
  }
  return obj
}
