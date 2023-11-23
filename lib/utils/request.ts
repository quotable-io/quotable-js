import { APIResponse } from '../types'
import parseTagsParam from './parseTagsParam'
import { renameIdProperty } from './renameIdProperty'
const API_URL = `https://api.quotable.io`
/**
 * Takes the API endpoint and parameters and returns the full url for the api
 * request.
 * @param PATH
 * @param params
 * @returns
 */
export function requestURL(PATH: string, params: any = {}): string {
  // Parse the tags param and convert to the format required by the API
  params = { ...params, tags: parseTagsParam(params.tags) }

  // Transform the order param to lowercase
  if (params.order) {
    params.order = String(params.order).toLowerCase()
  }
  const searchParams = new URLSearchParams(params)
  return `${API_URL}${PATH}?${searchParams.toString()}`
}

/**
 * Makes an GET request to the quotable API using the provided path and
 * query parameters.
 *
 * @internal
 */
export default async function request(
  PATH: string,
  params: any = {}
): Promise<APIResponse<any>> {
  try {
    const REQUEST_URL = requestURL(PATH, params)
    const response = await fetch(REQUEST_URL)
    const json = await response.json()
    let message
    let data
    if (Array.isArray(json)) {
      data = json
    } else {
      message = json?.statusMessage
      const { statusMessage, statusCode, lastItemIndex, ...rest } = json
      data = rest
    }

    // If the API response was an error object, return an error response
    if (message) {
      return { error: { message, code: 500 }, data: null }
    }
    data = renameIdProperty(data)
    return { data, error: null }
  } catch (error) {
    console.warn(error)
    return {
      error: { message: 'Internal error', code: 500 },
      data: null,
    }
  }
}
