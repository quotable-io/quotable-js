import * as quotable from '../lib'
import * as schema from './schema/index'

describe('quotable.getAuthor()', () => {
  test('Responds with 404 when called without params', async () => {
    const { error, data } = await quotable.getAuthor()
    expect(data).toBe(null)
    console.log(error)
  })

  test('returns correct author given a valid slug', async () => {
    const slug = 'abraham-lincoln'
    const { error, data } = await quotable.getAuthor({ slug })
    expect(error).toBe(null)
    expect(data.slug).toEqual(slug)
    expect(data).toMatchSchema(schema.Author)
  })
})
