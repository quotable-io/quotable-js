import request from '../utils/request'
import { Author, APIResponse } from '../types'

/**
 * @public
 */
export interface GetAuthorParams {
  slug?: string
  id?: string
}

/**
 * Get a single author by id
 * @public
 */
export async function getAuthor(
  params: GetAuthorParams = {}
): Promise<APIResponse<Author>> {
  let PATH: string
  if (params.slug) {
    PATH = `/authors/slug/${params.slug}`
  } else if (params.id) {
    PATH = `/authors/${params.id}`
  } else {
    return {
      data: null,
      error: {
        code: 422,
        message: 'Missing required parameter `id` or `slug`',
      },
    }
  }
  const response: APIResponse<Author> = await request(PATH)
  return response
}
