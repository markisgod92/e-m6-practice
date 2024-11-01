const express = require('express')
require('dotenv').config()
const init = require('./database')
const cors = require('cors')
const logger = require('./middlewares/logger')
const { genericErrorHandler, notFoundErrorHandler} = require('./middlewares/errorHandlers')

const PORT = process.env.PORT
const server = express()

server.use(cors())
server.use(express.json())
server.use(logger)

const usersRoutes = require('./routes/users')
server.use('/users', usersRoutes)

server.use(notFoundErrorHandler)
server.use(genericErrorHandler)

init()

server.listen(PORT, () => console.log(`Server up on port ${PORT}`))