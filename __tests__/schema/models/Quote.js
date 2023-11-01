import { types } from '../types.js'
import { Author } from './Author.js'
import { connectionProperties } from './Connection.js'

export const properties = {
  id: types.id,
  content: types.nonEmptyString,
  author: Author,
  tags: { type: 'array', items: types.title },
  length: { type: 'integer' },
  dateAdded: types.nonEmptyString,
  dateModified: types.nonEmptyString,
}

/**
 * Schema for a single `Quote`
 * This is the schema for a single Quote in the generated data files files
 * that are synced with the mongodb database. It includes additional computed
 * properties that not included in the source data.
 */
export const Quote = {
  title: 'Quote',
  type: 'object',
  properties: { ...properties },
  required: [...Object.keys(properties)],
  additionalProperties: false,
}

export const QuotesConnection = {
  type: 'object',
  title: 'Quotes Connection',
  properties: {
    ...connectionProperties,
    results: { type: 'array', items: Quote },
  },
  requited: [...Object.keys(connectionProperties), 'results'],
}

// Named Exports
// export { QuoteSource }
// export { Quote }
// export { quotes }
// export { properties }
// export { computedProperties }
