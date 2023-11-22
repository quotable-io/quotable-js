import * as quotable from '../lib'
import * as schema from './schema'

describe('quotable.getQuote()', () => {
  test('returns error when called with no params', async () => {
    const { data } = await quotable.getQuote()
    expect(data).toBe(null)
  })

  test('returns correct quote when called with valid id', async () => {
    const id = 'bfNpGC2NI'
    const quote = 'As a cure for worrying, work is better than whisky.'
    const { data, error } = await quotable.getQuote({ id })
    expect(error).toBe(null)
    expect(data).toMatchSchema(schema.Quote)
    expect(data.id).toEqual(id)
    expect(data.content).toEqual(quote)
  })
})
