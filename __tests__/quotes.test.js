import * as quotable from '../lib'
import * as schema from './schema/index'

let tags

beforeAll(() => {
  tags = ['Technology', 'Science']
})

describe('quotable.quotes()', () => {
  test('When called with no parameters', async () => {
    const { data, error } = await quotable.quotes()
    // Response status is OK
    expect(error).toBe(null)
    expect(data.count).toEqual(20)
    // The response data matches the schema
    expect(data).toMatchSchema(schema.QuotesConnection)
  })

  test('limit = 1', async () => {
    const { data, error } = await quotable.quotes({ limit: 1 })
    expect(error).toBe(null)
    // Response status is OK

    // Returns correct number of results (1)
    expect(data.count).toEqual(1)
  })

  test('filter by tags.any', async () => {
    const { data, error } = await quotable.quotes({ tags: { any: tags } })
    expect(error).toBe(null)
    // Response status is OK

    const { results } = data
    // Verify that all quotes contain **at least one** of the expected tags
    const hasCorrectTags = results.every((result) => {
      const tagsForResult = result.tags.map((t) => t.toLowerCase())
      return tags.some((t) => tagsForResult.includes(t.toLowerCase()))
    })
    expect(hasCorrectTags).toEqual(true)
  })
})
