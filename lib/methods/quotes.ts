import request from '../utils/request'
import {
  SortOrder,
  Connection,
  QuoteWithAuthor,
  Quote,
  Author,
  APIResponse,
} from '../types'

type QuoteSortBy = 'name' | 'dateAdded' | 'dateModified' | 'id' | 'author'

interface TagsParam {
  any?: string[]
  all?: string[]
}

/**
 * @public
 */
export interface ListQuotesParams {
  /**
   * The criteria used to sort the list of quotations
   * @defaultValue QuoteSortBy.DateAdded
   */
  sortBy?: QuoteSortBy
  /**
   * The order in which quotes are sorted
   */
  order?: SortOrder
  /**
   * Filter quotes by tag
   */
  tags?: TagsParam
  /**
   * Filter quotes by author
   */
  author?: Author
  /**
   * An array of quote ids
   */
  ids?: string[]
  /**
   * The page number of results to return for pagination
   * @defaultValue 1
   */
  page?: number
  /**
   * The maximum number of results to return per page
   * @defaultValue 20
   */
  limit?: number
}

/**
 * Get a paginated list of all quotes matching the given query parameters
 * @public
 */
export async function quotes(
  params: ListQuotesParams = {}
): Promise<APIResponse<Connection<QuoteWithAuthor>>> {
  let tags = ''
  if (params.tags) {
    if (params.tags.all) tags = params.tags.all.join(',')
    else if (params.tags.any) tags = params.tags.any.join('|')
  }
  // Fetch the list of quotes
  const quoteResponse: APIResponse<Connection<Quote>> = await request(
    '/quotes',
    { ...params, tags }
  )
  // If this quotes request returned an error response...
  // Return an an error response
  if (quoteResponse.status === 'ERROR') {
    return quoteResponse
  }

  // let `quoteResults` be the array of results from the quotes request
  // let `pageInfo` be an object containing pagination properties
  const { results: quoteResults, ...pageInfo } = quoteResponse.data
  const allSlugs = quoteResults.map(({ authorSlug }) => authorSlug)
  const slugs = Array.from(new Set(allSlugs))

  // Fetch the Author objects for the quote authors
  const authorResponse: APIResponse<Connection<Author>> = await request(
    '/authors',
    { slugs }
  )

  // If the author request returned an error, return the error response
  if (authorResponse.status === 'ERROR') {
    console.warn('Failed to fetch author details for quotes')
    return authorResponse
  }

  // let `authorResults` be the array Authors
  const { results: authorResults } = authorResponse.data

  // Create the `results` array that will be returned by this method.
  // We take the results of the quotes request, and attach the Author object to
  // each quote as the value of the `author` property.
  const results: QuoteWithAuthor[] = quoteResults.map(
    ({ authorSlug, ...quoteResult }) => {
      const author = authorResults.find(({ slug }) => slug === authorSlug)
      if (author === undefined) {
        throw new Error('failed to find authors for quotes')
      }
      return { ...quoteResult, author }
    }
  )
  return {
    ...quoteResponse,
    data: { ...pageInfo, results },
  }
}
