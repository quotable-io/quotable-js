import request from '../utils/request'
import { SortOrder, Connection, Tag, APIResponse } from '../types'

type TagSortBy = 'name' | 'dateAdded' | 'dateModified' | 'quoteCount'

/**
 * @public
 */
export interface ListTagsParams {
  sortBy?: TagSortBy
  order?: SortOrder
  slug?: string
  page?: number
  limit?: number
}

/**
 * Get a list of all tags
 * @public
 */
export async function tags(
  params: ListTagsParams
): Promise<APIResponse<Connection<Tag>>> {
  const response: APIResponse<Connection<Tag>> = await request('/tags', params)
  return response
}
