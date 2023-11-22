import request from '../utils/request'
import { Collection, Quote, APIResponse } from '../types'

/**
 * @public
 */
export interface SearchQuotesParams {
  /**
   * The search string. The query can be wrapped in quotes to search for an exact
   * phrase.
   */
  query: string
  /**
   * Specify the fields to search by. This takes a comma separated list of field
   * names. Supported search fields are "content", "author", "tags". By default,
   * it will search by all fields simultaneously.
   *
   * @defaultValue "content,author,tags"
   */
  fields?: string[]
  /**
   * The maximum number of single-character edits required to match the specified
   * search term. Setting this to zero disables fuzzy matching.
   */
  fuzzyMaxEdits?: number
  /**
   * When fuzzy search is enabled, this is the maximum number of variations to
   * generate and search for. This limit applies on a per-token basis.
   */
  fuzzyMaxExpansions: number
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
 * Search for quotes by keyword, content, or author name. Unlike the `quotes`
 * method, this method is powered by Atlas Search and intended to power a
 * search bar ui.
 * @public
 */
export async function searchQuotes(
  params: SearchQuotesParams
): Promise<APIResponse<Collection<Quote>>> {
  const response: APIResponse<Collection<Quote>> = await request(
    '/search/quotes',
    params
  )
  return response
}
