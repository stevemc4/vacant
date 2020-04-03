import hapi from '@hapi/hapi'
import dotenv from 'dotenv'

import routes from './routes'

dotenv.config()

const server = new hapi.Server({
  port: process.env.VACANT_PORT
})

async function boostrap (): Promise<void> {
  server.route(routes)
  await server.start()
  console.log(`Server started on port ${process.env.VACANT_PORT}`)
}

boostrap()
