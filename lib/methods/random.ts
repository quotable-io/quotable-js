import request from '../utils/request'
import { Quote, QuoteWithAuthorDetails, APIResponse } from '../types'
import { getAuthorDetails } from '../utils/GetAuthorDetails'

/**
 * @public
 */
export interface RandomQuotesParams {
  tags?: string
  author?: string
  limit?: number
  maxLength?: number
  minLength?: number
}

/**
 * Get one or more random quotes
 * @public
 */
export async function random(
  params: RandomQuotesParams
): Promise<APIResponse<QuoteWithAuthorDetails[]>> {
  const response: APIResponse<Quote[]> = await request('/quotes/random', params)

  if (response.error !== null) {
    return response
  }

  const data = await getAuthorDetails(response.data)

  if (data !== null) {
    return { ...response, data }
  } else {
    return {
      data,
      error: {
        message: 'failed to fetch author details for quotes',
        code: 500,
      },
    }
  }
}
