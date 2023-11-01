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

function onChange() {
  console.log('build')
  shell.exec('npm run build')
}

watch(join(dir, '../lib'), options, onChange)
