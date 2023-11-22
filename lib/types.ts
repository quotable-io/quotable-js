/**
 * An object representing a single Author
 * @public
 */
export interface Author {
  /**
   * The author id
   */
  id: string
  /**
   * A url friendly id for the author, based on the authors name
   */
  slug: string
  /**
   * The full name of the author
   */
  name: string
  /**
   * A short bio of authors (from wikipedia)
   */
  bio: string
  /**
   * A one line description of the author (source wikipedia)
   */
  description: string
  /**
   * A link to the authors wikipedia page
   */
  link: string
  /**
   * The number of quotations by this author
   */
  quoteCount: number
  quotes?: Quote[]
}

/**
 * An quotation object returned by the quotable API.
 * @internal
 */
export interface Quote {
  DateAdded: string
  DateModified: string
  /**
   * A unique id for this quote
   */
  id: string
  /**
   * The quotation text
   */
  content: string
  /**
   * The full name of the person the quotation is attributed to
   */
  author: string

  /**
   * author slug
   */
  authorSlug: string
  /**
   * author ID
   */
  authorId: string
  /**
   * A list of one or more tags
   */
  tags: string[]
  /**
   * The length of the quote (number of characters)
   */
  length: number
}

/**
 * A quotation object that includes the details about the quote author.
 * The value of the `author` property is an `Author` object that includes
 * details about the quote's author.
 * @public
 */
export interface QuoteWithAuthorDetails
  extends Omit<Quote, 'author' | 'authorSlug' | 'authorId'> {
  author: Author
}

/**
 * An object representing a single Tag
 * @public
 */
export interface Tag {
  _id: string
  name: string
  slug: string
}

/**
 * A paginated API response
 * @public
 */
export interface Collection<T> {
  count: number
  totalCount: number
  totalPages: number
  page: number
  results: T[]
}

/**
 * @public
 */
export interface SuccessfulResponse<T> {
  data: T
  error: null
}
/**
 * @public
 */
export interface ErrorResponse {
  error: { code?: number; message: string }
  data: null
}

/**
 * A paginated list of authors
 */
export type AuthorsCollection = Collection<Author>

export type QuotesCollection = Collection<QuoteWithAuthorDetails>
/**
 * The object returned by all API methods.  If request was successful, the
 * the response will include a data object containing the response data.
 * If the request returned an error, the response will include an `error`
 * property whose value is in an error object.
 *
 * The `status` property can be used to determine the type of response.
 *
 * @public
 */
export type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse

/**
 * The order in which results are sorted
 * @public
 */
export type SortOrder = 'ASC' | 'ASCENDING' | 'DESC' | 'DESCENDING'
