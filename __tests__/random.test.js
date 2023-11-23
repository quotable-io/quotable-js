import * as quotable from '../lib'
import * as schema from './schema/index'

describe('quotable.random()', () => {
  describe('when called with no parameters', () => {
    test('When called with no parameters', async () => {
      const { data, error } = await quotable.random()
      // Response status is OK
      expect(error).toBe(null)
      expect(data.length).toEqual(1)
      const [quote] = data
      // The response data matches the schema
      expect(quote).toMatchSchema(schema.Quote)
    })
  })
})
