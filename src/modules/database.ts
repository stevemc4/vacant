import path from 'path'
import { Connection } from 'typeorm'

import dotenv from 'dotenv'

dotenv.config()

const database = new Connection({
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

export { database }
