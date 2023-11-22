type TagsParam = string[] | { any?: string[]; all?: string[] }

export default function parseTagsParam(input: TagsParam = []): string {
  if (Array.isArray(input)) {
    return input.join('|')
  }
  if (input.all) {
    return input.all.join(',')
  }
  if (input.any) {
    return input.any.join('|')
  }
  return ''
}
