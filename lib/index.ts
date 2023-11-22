import { authors, ListAuthorsParams } from './methods/authors'
import { quotes, ListQuotesParams } from './methods/quotes'
import { random, RandomQuotesParams } from './methods/random'
import { getAuthor, GetAuthorParams } from './methods/getAuthor'
import { getQuote, GetQuoteParams } from './methods/getQuote'
import {
  search,
  SearchQuotesParams,
  SearchAuthorsParams,
} from './methods/search'

// import { tags, ListTagsParams } from './methods/tags'
import {
  Author,
  QuoteWithAuthorDetails,
  QuotesCollection,
  AuthorsCollection,
  SortOrder,
  APIResponse,
  SuccessfulResponse,
  ErrorResponse,
  Tag,
  Collection,
} from './types'

export {
  // Export types
  QuoteWithAuthorDetails,
  Author,
  Tag,
  Collection,
  QuotesCollection,
  AuthorsCollection,
  ListAuthorsParams,
  ListQuotesParams,
  RandomQuotesParams,
  GetAuthorParams,
  GetQuoteParams,
  SearchAuthorsParams,
  SearchQuotesParams,
  SortOrder,
  APIResponse,
  SuccessfulResponse,
  ErrorResponse,
  quotes,
  authors,
  random,
  search,
  getAuthor,
  getQuote,
}
