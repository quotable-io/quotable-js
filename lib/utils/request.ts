import { APIResponse } from '../types'
import { stringify } from './queryString'

const API_URL = `https://api.quotable.io`

/**
 * Makes an GET request to the quotable API using the provided path and
 * query parameters.
 *
 * @private
 */
export default async function request(
  PATH: string,
  params: any = {}
): Promise<APIResponse<any>> {
  try {
    if (params.order) {
      params.order = String(params.order).toLowerCase()
    }
    const REQUEST_URL = `${API_URL}${PATH}${stringify(params)}`
    const response = await fetch(REQUEST_URL)
    const {
      lastItemIndex,
      statusMessage: message,
      statusCode: code,
      ...rest
    } = await response.json()

    // If the API response was an error object, return an error response
    if (message) {
      return { status: 'ERROR', error: { message, code }, data: undefined }
    }
    let data = rest

    // Otherwise return a successful response with the data..
    if (data._id) {
      data = { ...data, id: data._id }
    }

    if (data.results && data.results[0] && data.results[0]._id) {
      data.results = data.results.map(({ _id, ...datum }: any) => {
        return _id ? { ...datum, id: _id } : datum
      })
    }

    return { status: 'OK', data, error: undefined }
  } catch (error) {
    console.warn(error)
    return {
      status: 'ERROR',
      error: { message: 'Internal error', code: 500 },
      data: undefined,
    }
  }
}
