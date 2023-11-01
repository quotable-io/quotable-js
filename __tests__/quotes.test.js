import { quotable } from '../lib'
import * as schema from './schema/index'

const tags = ['technology', 'science']

describe('quotable.quotes()', () => {
  test('When called with no parameters', async () => {
    const { data, status } = await quotable.quotes()
    // Response status is OK
    expect(status).toEqual('OK')
    // The response data matches the schema
    expect(data).toMatchSchema(schema.QuotesConnection)
  })

  test('limit = 1', async () => {
    const { data, status } = await quotable.quotes({ limit: 1 })
    // Response status is OK
    expect(status).toEqual('OK')

    // Returns correct number of results (1)
    expect(data.count).toEqual(1)
  })

  test('filter by tags.any', async () => {
    const { data, status } = await quotable.quotes({ tags: { any: tags } })
    // Response status is OK
    expect(status).toEqual('OK')

    // Returns correct number of results (1)
    expect(data.count).toEqual(1)
  })
})
