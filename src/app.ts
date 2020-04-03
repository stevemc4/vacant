import { Connect } from './modules/database'
import hapi from '@hapi/hapi'
import joi from '@hapi/joi'
import dotenv from 'dotenv'

import routes from './routes'

dotenv.config()

const server = new hapi.Server({
  port: process.env.VACANT_PORT,
  router: {
    stripTrailingSlash: true
  }
})

async function boostrap (): Promise<void> {
  server.validator(joi)
  server.route(routes)
  await Connect()
  await server.start()
  console.log(`Server started on port ${process.env.VACANT_PORT}`)
}

boostrap()
