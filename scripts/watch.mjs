import { minimatch } from 'minimatch'
import shell from 'shelljs'
import watch from 'node-watch'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const dir = dirname(fileURLToPath(import.meta.url))

const options = {
  recursive: true,
  delay: 500,
}

console.log('npm run build')
shell.exec('npm run build')
console.log('watching for changes... ')
function onChange() {
  console.log('npm run build')
  shell.exec('npm run build')
}

watch(join(dir, '../lib'), options, onChange)
