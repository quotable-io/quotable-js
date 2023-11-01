/**
 * An object representing a single quotation
 * @public
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

  tags: string[]
  /**
   * A url friendly id that can be used to get details about the author
   */
  authorSlug: string
  /**
   * the id of the author
   */
  authorId: string
  /**
   * The length of the quote (number of characters)
   */
  length: number
}

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
}

/**
 * An object representing a single quote, including the author details
 * @public
 */
export interface QuoteWithAuthor {
  /**
   * A unique id for this quote
   */
  id: string
  /**
   * The quotation text
   */
  content: string
  /**
   * The author that the quotation in attributed to
   */
  author: Author
  /**
   * The length of the quote (number of characters)
   */
  length: number

  tags: string[]
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
export interface Connection<T> {
  count: number
  totalCount: number
  totalPages: number
  page: number
  results: T[]
}

/**
 * The error object returned by an API method
 */
interface ErrorDetails {
  code: number
  message: string
}

export interface SuccessfulResponse<T> {
  status: 'OK'
  data: T
  error: undefined
}
export interface ErrorResponse {
  status: 'ERROR'
  error: ErrorDetails
  data: undefined
}

/**
 * The object returned by all API methods.  If request was successful, the
 * the response will include a data object containing the response data.
 * If the request returned an error, the response will include an `error`
 * property whose value is in an error object.
 *
 * The `status` property can be used to determine the type of response.
 */
export type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse

export type SortOrder = 'ASC' | 'ASCENDING' | 'DESC' | 'DESCENDING'
