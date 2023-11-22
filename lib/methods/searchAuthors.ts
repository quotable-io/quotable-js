import request from '../utils/request'
import { Collection, Author, APIResponse } from '../types'

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
 * Gets a paginated list of authors matching the given parameters.
 * @public
 */
export async function searchAuthors(
  params: SearchAuthorsParams
): Promise<APIResponse<Collection<Author>>> {
  const response: APIResponse<Collection<Author>> = await request(
    '/search/authors',
    params
  )
  return response
}
