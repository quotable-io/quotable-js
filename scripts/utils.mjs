import { join } from 'path'
import {
  rmSync as rm,
  readFileSync as readFile,
  readdirSync as readdir,
  writeFileSync as writeFile,
  statSync as stat,
  mkdirSync as mkdir,
} from 'fs'

export { rm, readFile, readdir, writeFile, stat, mkdir }

export function exists(path) {
  try {
    stat(path)
    return true
  } catch (e) {
    return false
  }
}

export function eachFile(DIR, fn) {
  const files = readdir(DIR)
  files.forEach((file) => {
    const FILE_PATH = join(DIR, file)
    const stat = stat(FILE_PATH)
    if (stat.isDirectory()) {
      eachFile(FILE_PATH, fn)
    } else {
      fn(FILE_PATH)
    }
  })
}

export function tsConfig() {
  const file = readFile(
    '/Users/lukepeavey/Projects/quotable/quotable-js/tsconfig.json',
    { encoding: 'utf-8' }
  )
  return JSON.parse(file)
}
