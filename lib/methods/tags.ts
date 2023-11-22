import request from '../utils/request'
import { SortOrder, Collection, Tag, APIResponse } from '../types'

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
): Promise<APIResponse<Collection<Tag>>> {
  const response: APIResponse<Collection<Tag>> = await request('/tags', params)
  return response
}
