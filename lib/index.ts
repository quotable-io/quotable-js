import { authors, ListAuthorsParams } from './methods/authors'
import { quotes, ListQuotesParams } from './methods/quotes'
import { random, RandomQuotesParams } from './methods/random'
import { getAuthor, GetAuthorParams } from './methods/getAuthor'
import { getQuote, GetQuoteParams } from './methods/getQuote'
import { searchAuthors, SearchAuthorParams } from './methods/searchAuthors'
import { searchQuotes, SearchQuoteParams } from './methods/searchQuotes'
import { tags, ListTagsParams } from './methods/tags'
import { Quote, Author, Tag, Connection } from './types'

/**
 * @public
 */
const search = {
  quotes: searchQuotes,
  authors: searchAuthors,
}

const quotable = {
  authors,
  quotes,
  random,
  getAuthor,
  getQuote,
  tags,
  search,
}

export {
  Quote,
  Author,
  Tag,
  Connection,
  ListAuthorsParams,
  ListQuotesParams,
  RandomQuotesParams,
  GetAuthorParams,
  GetQuoteParams,
  SearchAuthorParams,
  SearchQuoteParams,
  ListTagsParams,
  authors,
  quotes,
  random,
  getAuthor,
  getQuote,
  tags,
  search,
  quotable,
}
