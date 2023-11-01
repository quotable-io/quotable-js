export const types = {
  id: {
    type: 'string',
    pattern: '^[\\w\\-]+$',
    minLength: 5,
    maxLength: 20,
  },
  slug: {
    type: 'string',
    pattern: '^([a-z0-9]+(-[a-z0-9]+)*)$',
    minLength: 1,
  },
  title: {
    type: 'string',
    pattern: '^[A-Z][a-z0-9]+(\\s[A-Z][a-z0-9]+)*$',
    minLength: 1,
  },
  nonEmptyString: {
    type: 'string',
    minLength: 1,
  },
  naturalNumber: {
    type: 'integer',
    minimum: 0,
  },
}
