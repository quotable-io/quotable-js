import request from '../utils/request'
import { Connection, Author, SortOrder, APIResponse } from '../types'

type AuthorSortBy = 'name' | 'dateAdded' | 'dateModified' | 'quoteCount'

/**
 * @public
 */
export interface ListAuthorsParams {
  /**
   * the criteria used to sort the results
   * @defaultValue AuthorSortBy.dateAdded
   */
  sortBy?: AuthorSortBy
  /**
   * The order in which results are sorted (ascending / descending)
   * @defaultValue SortOrder.ascending
   */
  order?: SortOrder
  /**
   * An array containing one or more author "slugs". slugs are url friendly
   * ids that are derived from the authors name.
   *
   */
  slug?: string[]
  /**
   * An array containing one or more author ids.
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
 * Gets a paginated list of authors matching the given parameters.
 * @public
 */
export async function authors(
  params: ListAuthorsParams
): Promise<APIResponse<Connection<Author>>> {
  const response: APIResponse<Connection<Author>> = await request(
    '/authors',
    params
  )
  return response
}
