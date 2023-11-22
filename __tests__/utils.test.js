import { stringify } from '../lib/utils/queryString'
import { renameIdProperty } from '../lib/utils/renameIdProperty'

describe('Utils/queryString', () => {
  it('Converts an object to query string', () => {
    const obj = { id: '123', sortBy: 'name' }
    expect(stringify(obj)).toEqual('?id=123&sortBy=name')
  })
})

describe('Utils/renameIdProperty', () => {
  it('returns expected response for object', () => {
    expect(renameIdProperty({ foo: 'bar' })).toEqual({ foo: 'bar' })
  })
  it('returns expected response for object with _id property', () => {
    expect(renameIdProperty({ foo: 'bar', _id: 1 })).toEqual({
      foo: 'bar',
      id: 1,
    })
  })
  it('returns expected response for array of objects with _id property', () => {
    const originalObjects = [
      { foo: 'bar', _id: 1 },
      { foo: 'bar', _id: 2 },
    ]
    const expected = [
      { foo: 'bar', id: 1 },
      { foo: 'bar', id: 2 },
    ]
    expect(renameIdProperty(originalObjects)).toEqual(expected)
  })

  it('Object with results property', () => {
    const originalObject = {
      _id: 123,
      name: 'abc',
      results: [
        { foo: 'bar', _id: 1 },
        { foo: 'bar', _id: 2 },
      ],
    }
    const expected = {
      id: 123,
      name: 'abc',
      results: [
        { foo: 'bar', id: 1 },
        { foo: 'bar', id: 2 },
      ],
    }
    expect(renameIdProperty(originalObject)).toEqual(expected)
  })
})
