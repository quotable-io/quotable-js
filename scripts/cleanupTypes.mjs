import { exists, tsConfig, rm } from './utils.mjs'
import { join } from 'path'

const { outDir } = tsConfig().compilerOptions
const typesDir = join(outDir, 'types')
if (exists(typesDir)) {
  rm(typesDir, { recursive: true })
  console.log('Removed type declarations')
}
