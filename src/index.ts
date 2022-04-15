import express from 'express'
import cors from 'cors'

const APP_PORT = 8000
const FRONT_PORT = 3000
const CORS_OPT = {
  origin: [`http://localhost:${FRONT_PORT}`],
}

const app = express()

app.use(express.json())
app.use(cors(CORS_OPT))

app.get('/', (req, res) => {
  res.send('Hello World!!!')
})

app.listen(APP_PORT, () => {
  console.log(`Listening to port ${APP_PORT} `)
})
