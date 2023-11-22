import request from '../utils/request'
import {
  SortOrder,
  Collection,
  QuoteWithAuthorDetails,
  Quote,
  Author,
  APIResponse,
} from '../types'
import { getAuthorDetails } from '../utils/GetAuthorDetails'

/**
 * @public
 */
export interface ListQuotesParams {
  /**
   * The criteria used to sort the list of quotations
   * @defaultValue QuoteSortBy.DateAdded
   */
  sortBy?: 'name' | 'dateAdded' | 'dateModified' | 'id' | 'author'
  /**
   * The order in which quotes are sorted
   */
  order?: SortOrder
  /**
   * Filter quotes by tag
   */
  tags?: string[] | { any?: string[]; all?: string[] }
  /**
   * Filter quotes by author
   */
  author?: Author
  /**
   * Finds quotes matching the given search term.  This parameter cannot be
   * combined with any other filter parameters such as author, tags, ids, etc.
   * if the `search` param is provided, all other filters will be ignored.
   *
   * sortBy and sortOrder will also have no effect when using this param,
   * results are sorted by score.
   */
  search?: string
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
): Promise<APIResponse<Collection<QuoteWithAuthorDetails>>> {
  // Fetch the list of quotes
  const quoteResponse: APIResponse<Collection<Quote>> = await request(
    '/quotes',
    params
  )

  // If this quotes request returned an error response...
  // Return an an error response
  if (quoteResponse.error != null) {
    return quoteResponse
  }
  const results = await getAuthorDetails(quoteResponse.data.results)

  if (results !== null) {
    return { ...quoteResponse, data: { ...quoteResponse.data, results } }
  } else {
    return {
      data: null,
      error: { message: 'failed to fetch quotes', code: 500 },
    }
  }
}
