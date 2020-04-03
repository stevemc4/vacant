import hapi from '@hapi/hapi'
import dotenv from 'dotenv'

import routes from './routes'
import { database } from './modules/database'

dotenv.config()

const server = new hapi.Server({
  port: process.env.VACANT_PORT
})

async function boostrap (): Promise<void> {
  server.route(routes)
  await database.connect()
  await server.start()
  console.log(`Server started on port ${process.env.VACANT_PORT}`)
}

boostrap()
