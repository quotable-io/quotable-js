import { types } from '../types.js'
import { connectionProperties } from './Connection.js'

// Author properties
export const properties = {
  id: types.id,
  slug: types.slug,
  name: types.nonEmptyString,
  quoteCount: { type: 'integer' },
  bio: types.nonEmptyString,
  description: { type: 'string', minLength: 1, maxLength: 50 },
  link: { type: 'string', format: 'uri', minLength: 1 },
  dateAdded: types.nonEmptyString,
  dateModified: types.nonEmptyString,
}

/**
 * Schema for a single `Author`
 * This is the schema for a single Author in the generated data files files
 * that are synced with the mongodb database. It includes additional computed
 * properties that not included in the source data.
 */
export const Author = {
  title: 'Author',
  type: 'object',
  properties: { ...properties },
  required: [...Object.keys(properties)],
  additionalProperties: true,
}

export const AuthorsConnection = {
  title: 'Authors Connection',
  type: 'object',
  properties: {
    ...connectionProperties,
    results: { type: 'array', items: Author },
  },
  required: [...Object.keys(connectionProperties), 'results'],
}
