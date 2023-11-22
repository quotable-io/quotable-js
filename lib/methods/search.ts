import request from '../utils/request'
import {
  Collection,
  Author,
  APIResponse,
  AuthorsCollection,
  QuotesCollection,
} from '../types'

/**
 * @public
 */
export interface SearchAuthorsParams {
  /**
   * The search query
   */
  query: string
  /**
   * Enable autocomplete search
   *
   * @defaultValue true
   */
  autocomplete?: boolean
  /**
   * Sets the minimum number of search terms (words) that must match for an
   * author to be included in results. Basically, if this is set to 1, the
   * results will include all authors that match at least one part of the name.
   * So query="John F. Kennedy" the results would include all authors that
   * match either "john" OR "kennedy".
   *
   * If this is set to 2: when the search query includes two or more "terms",
   * at least two of those terms must match. So query="John F. Kennedy" would
   * only return authors that match "John" AND "Kennedy".
   *
   * @defaultValue 2
   */
  matchThreshold?: number
  /**
   * The page number of results to return for pagination
   * @defaultValue 1
   *
   */
  page?: number
  /**
   * The maximum number of results to return per page
   * @defaultValue 20
   *
   */
  limit?: number
}

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
  fuzzyMaxExpansions?: number
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
 * The
 */
export const search = {
  async authors(
    params: SearchAuthorsParams
  ): Promise<APIResponse<AuthorsCollection>> {
    return request('/search/authors', params)
  },

  async quotes(
    params: SearchQuotesParams
  ): Promise<APIResponse<QuotesCollection>> {
    return request('/search/quotes', params)
  },
}
