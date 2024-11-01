const express = require('express')
require('dotenv').config()
const init = require('./database')
const cors = require('cors')

const PORT = process.env.PORT
const server = express()

server.use(cors())
server.use(express.json())

init()

server.listen(PORT, () => console.log(`Server up on port ${PORT}`))