import * as quotable from '../lib/index'

async function run() {
  const { data, error } = await quotable.quotes()

  if (error !== null) {
    console.error(error.message)
    process.exit(1)
  } else {
    console.log(data)
  }
}

run()
