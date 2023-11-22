import request from '../utils/request'
import { Quote, Author, QuoteWithAuthorDetails, APIResponse } from '../types'
import { getAuthorDetails } from '../utils/GetAuthorDetails'

/**
 * @public
 */
export interface GetQuoteParams {
  id: string
}

/**
 * Get a single quote by id
 * @public
 */
export async function getQuote(
  params: GetQuoteParams
): Promise<APIResponse<QuoteWithAuthorDetails>> {
  if (!params?.id) {
    return { data: null, error: { message: 'Missing required parameter: id' } }
  }
  const response: APIResponse<Quote> = await request(`/quotes/${params.id}`)
  if (response.error !== null) {
    return response
  }

  // If this quotes request returned an error response...
  // Return an an error response
  if (response.error !== null) {
    return response
  }
  const data = await getAuthorDetails([response.data])

  if (data !== null) {
    return { ...response, data: data[0] }
  } else {
    return {
      data: null,
      error: { message: 'failed to fetch quotes', code: 500 },
    }
  }
}
