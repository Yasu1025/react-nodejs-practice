import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { routes } from './route/routes'
import { createConnection } from 'typeorm'
import ormConfig from './config/ormconfig'
import cookieParser from 'cookie-parser'

const APP_PORT = 8000
const FRONT_PORT = 3000
const CORS_OPT = {
  credentials: true,
  origin: [`http://localhost:${FRONT_PORT}`],
}

createConnection(ormConfig).then(connection => {
  const app = express()

  app.use(express.json())
  app.use(cookieParser())
  app.use(cors(CORS_OPT))

  routes(app)

  app.listen(APP_PORT, () => {
    console.log(`Listening to port ${APP_PORT} `)
  })
})
