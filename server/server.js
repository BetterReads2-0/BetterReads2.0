const express = require('express')
const path = require('path')

const apiRoutes = require('./routes/apiRoutes.js')

const app = express()
const PORT = 3000
app.use(express.json()) // built in middleware parsing incoming JSON requests and puts parsed data in req.body
app.use(express.urlencoded({ extended: true }))

// running a get request sending dist/index to server.
app.use(express.static(path.join(__dirname, '../dist')))

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'))
})

// All api requests will go through here
app.use('/api', apiRoutes)

// local error handler
app.use((req, res) => res.sendStatus(404))

// global error handler;
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Error handler caught middleware error',
    status: 500,
    message: { err: 'An error occured' }
  }
  const errorObj = Object.assign(defaultErr, err)
  return res.status((errorObj.status)).json(errorObj.message)
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT} ...`)
})
