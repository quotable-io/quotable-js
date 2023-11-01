import { quotable } from '../lib/index.js'

async function run() {
  const res = await quotable.quotes()
  if (res.status === 'OK') {
    const { data } = res
    console.log(data)
  }
  process.exit(1)
}

run()
