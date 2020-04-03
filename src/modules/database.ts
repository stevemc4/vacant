import path from 'path'
import { Connection, createConnection } from 'typeorm'

let database: Connection

async function Connect (): Promise<void> {
  const db = await createConnection({
    type: 'mariadb',
    host: process.env.VACANT_DATABASE_HOSTNAME,
    username: process.env.VACANT_DATABASE_USERNAME,
    password: process.env.VACANT_DATABASE_PASSWORD,
    database: process.env.VACANT_DATABASE_NAME,
    entities: [
      path.join(__dirname, '../models', process.env.NODE_ENV === 'production' ? '*.js' : '*.ts')
    ],
    synchronize: process.env.NODE_ENV === 'development'
  })

  database = db
}

export { database, Connect }
