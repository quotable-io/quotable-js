import request from '../utils/request'
import { Connection, Quote, APIResponse } from '../types'
import { ListQuotesParams } from './quotes'

/**
 * @private
 */
export async function quoteOnly(
  params: ListQuotesParams = {}
): Promise<APIResponse<Connection<Quote>>> {
  const res = await request('/quotes', params)
  return res
}
