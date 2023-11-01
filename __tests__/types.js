export const Connection = {
  results: expect.any(Array),
  count: expect.any(Number),
  totalCount: expect.any(Number),
  totalPages: expect.any(Number),
  page: expect.any(Number),
}

export const PageInfo = {
  count: expect.any(Number),
  totalCount: expect.any(Number),
  totalPages: expect.any(Number),
  page: expect.any(Number),
}
export const Author = {
  id: expect.any(String),
  slug: expect.any(String),
  name: expect.any(String),
  bio: expect.any(String),
  description: expect.any(String),
  link: expect.any(String),
  quoteCount: expect.any(Number),
}

export const QuoteWithAuthor = {
  id: expect.any(String),
  content: expect.any(String),
  author: expect.objectContaining(Author),
  length: expect.any(Number),
  tags: expect.any(Array),
}

export const Quote = {
  id: expect.any(String),
  content: expect.any(String),
  length: expect.any(Number),
  tags: expect.arrayContaining([expect.any(Number)]),
}

export const Tag = {
  _id: expect.any(String),
  name: expect.any(String),
  slug: expect.any(String),
}
