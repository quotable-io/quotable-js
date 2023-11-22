import { Quote, QuoteWithAuthorDetails } from '../types'
import { uniq } from './uniq'
import { authors } from '../methods/authors'

/**
 * Takes an array of quotes returned by the quotable API and attached the Author
 * object to each quote as the value of the `author` property.
 * @internal
 */
export async function getAuthorDetails(
  quotes: Quote[]
): Promise<QuoteWithAuthorDetails[] | null> {
  const slugs = uniq(quotes.map(({ authorSlug }) => authorSlug))
  const authorsResponse = await authors({ slugs })
  if (authorsResponse.error) {
    return null
  }
  const { results } = authorsResponse.data

  return quotes.map(({ authorSlug, authorId, ...quote }) => {
    const author = results.find(({ slug }) => slug === authorSlug)
    if (author === undefined) {
      throw new Error('Failed to find author for quote')
    }
    return { ...quote, author }
  })
}
