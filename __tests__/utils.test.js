import { stringify } from '../lib/utils/queryString'

describe('Utils/queryString', () => {
  it('Converts an object to query string', () => {
    const obj = { id: '123', sortBy: 'name' }
    expect(stringify(obj)).toEqual('?id=123&sortBy=name')
  })
})
