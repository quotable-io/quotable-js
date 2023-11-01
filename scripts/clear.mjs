import { exists, tsConfig, rm } from './utils.mjs'

const { outDir } = tsConfig().compilerOptions

if (exists(outDir)) {
  rm(outDir, { recursive: true })
  console.log('clear')
}
