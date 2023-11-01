import request from '../utils/request'
import {
  Quote,
  QuoteWithAuthor,
  APIResponse,
  Connection,
  Author,
} from '../types'

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
): Promise<APIResponse<QuoteWithAuthor[]>> {
  try {
    const response: APIResponse<Quote[]> = await request(
      '/quotes/random',
      params
    )
    if (response.status === 'ERROR') {
      return response
    }

    const { data: quotes } = response

    const slugs = Array.from(
      new Set(quotes.map(({ authorSlug }) => authorSlug))
    )
    const authorResponse: APIResponse<Connection<Author>> = await request(
      '/authors',
      { slugs }
    )
    if (authorResponse.status === 'ERROR') {
      return authorResponse
    }
    const authors = authorResponse.data.results
    const data = quotes.map(({ authorSlug, ...quote }) => {
      const author = authors.find(({ slug }) => slug === authorSlug)
      if (author === undefined) {
        throw new Error('Failed to find author for quote')
      }
      return { ...quote, author }
    })
    return { ...response, data }
  } catch (error) {
    console.error(error)
    return {
      status: 'ERROR',
      error: { message: 'Internal error', code: 500 },
      data: undefined,
    }
  }
}
