import request from '../utils/request'
import { Quote, Author, QuoteWithAuthor, APIResponse } from '../types'

/**
 * @public
 */
export interface GetQuoteParams {
  id?: string
}

/**
 * Get a single quote by id
 * @public
 */
export async function getQuote(
  params: GetQuoteParams
): Promise<APIResponse<QuoteWithAuthor>> {
  try {
    if (!params.id) {
      throw new Error('Missing required parameter: id')
    }
    const response: APIResponse<Quote> = await request(`/quotes/${params.id}`)
    if (response.status === 'ERROR') {
      return response
    }

    const slug = response.data.authorSlug
    const authorResponse: APIResponse<Author> = await request(
      `/authors/slug/${slug}`
    )
    if (authorResponse.status === 'ERROR') {
      return authorResponse
    }

    const data = {
      ...response.data,
      author: authorResponse.data,
    }

    return { ...response, data }
  } catch (error) {
    let message = 'Internal server error'
    if (error instanceof Error) {
      if (error.message) {
        message = error.message
      }
    }
    return {
      status: 'ERROR',
      error: { message, code: 500 },
      data: undefined,
    }
  }
}
