import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { build } from 'esbuild'
import { exists, rm, mkdir } from './utils.mjs'

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '../')
const outDir = join(rootDir, 'dist')

try {
  console.log('=====================================================')
  console.log('Building ESM bundle')
  console.log('=====================================================')
  // Remove existing build files
  if (exists(outDir)) {
    rm(outDir, { recursive: true })
  }
  mkdir(outDir)
  // Build ESM bundle
  const esBuild = await build({
    entryPoints: ['lib/index.ts'],
    format: 'esm',
    bundle: true,
    outfile: 'dist/index.js',
    target: 'node18',
    external: ['node-fetch'],
  })
  console.log(esBuild)
} catch (error) {
  console.error(error)
  process.exit(1)
}
