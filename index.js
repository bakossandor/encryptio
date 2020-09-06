const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const { getInformation, postInformation } = require('./services/information')
const { port } = require('./config/index')

const app = express()

// Parsing incoming JSON body
app.use(bodyParser.json())

// Basic Request Logging
app.use(morgan('combined'))

// Endpoint configuration,
// For future extension I would create a Routing module
app.get('/api/information', getInformation)
app.post('/api/information', postInformation)

// Universal Error Handling for possible uncaught errors
app.use('/', (err, req, res, next) => {
  console.error(err)
  res.status(500).send({'developerMessage': 'Internal Server Error'})
})

app.listen(port, () => {
  console.log(`App is listening at port: ${port}`)
})