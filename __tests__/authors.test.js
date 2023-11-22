import * as quotable from '../lib'

describe('quotable.authors()', () => {
  test('when called with no parameters', async () => {
    const { data, error } = await quotable.authors()
    expect(error).toBe(null)

    expect(data.count).toBe(20)
  })

  test('with limit = 1', async () => {
    const { data, error } = await quotable.authors({ limit: 1 })
    expect(error).toBe(null)

    expect(data.count).toBe(1)
  })

  test('single author slug', async () => {
    const { data, error } = await quotable.authors({
      slug: ['ralph-waldo-emerson'],
    })
    expect(error).toBe(null)
    expect(data.count).toBe(1)
    expect(data.results[0].slug).toEqual('ralph-waldo-emerson')
  })

  test('multiple authors by slug', async () => {
    const { data, error } = await quotable.authors({
      slugs: ['ralph-waldo-emerson', 'abraham-lincoln'],
    })
    expect(error).toBe(null)
    expect(data.count).toBe(2)
  })
})
