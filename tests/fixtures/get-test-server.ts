// tests/fixtures/get-test-server.ts

import { unstable_dev } from "wrangler"
import defaultAxios from "axios"
import { ExecutionContext } from "ava"

export const getTestServer = async (t: ExecutionContext<unknown>) => {
  const wrangler = await unstable_dev(
    "src/index.ts",
    {},
    {
      disableExperimentalWarning: true,
      testMode: true,
    }
  )

  const server_url = `http://127.0.0.1:${wrangler.port}`

  // when the test is done, stop the wrangler server
  t.teardown(() => {
    wrangler.stop()
  })

  const axios = defaultAxios.create({ baseURL: server_url })

  return { wrangler, server_url, axios }
}
