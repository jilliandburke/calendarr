import express from 'express'
import cors, { CorsOptions } from 'cors' 
import { readConfig, updateConfig } from './db/calendarr'

const app = express()
const port = 3333
const corsOptions: CorsOptions = {
  allowedHeaders: [
    'Content-Type',
    'Accept',
    'Content-Length',
    'Accept-Encoding',
    'Access-Control-Allow-Origin',
    'Origin',
    'X-Requested-With'
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  origin: "*",
  optionsSuccessStatus: 200
}

// Hello to CORS
app.use(cors(corsOptions))
app.use(express.json())

app.get('/config', async (req, res) => {
  const configData = await readConfig()
  res.status(200).json({ configData })
})

app.patch('/config', async (req, res) => {
  try {
    const configData = await updateConfig(req.body)
    res.status(200).json({ configData })
  } catch (error) {
    res.status(400).json({ error })
  }
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
