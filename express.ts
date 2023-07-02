import express from 'express'
const app = express()
import getAllEmployees from "./db/calendarr"
const port = 3333

// Hello to CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*") // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })

app.get('/calendarr', async (req, res) => {
    const employees = await getAllEmployees()
    res.status(200).json({ employees })
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
