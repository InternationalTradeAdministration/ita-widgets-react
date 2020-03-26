const express = require('express')
const app = express()

const PORT = 80
const HOST = '0.0.0.0'

app.use(express.static('build'))
app.listen(PORT, HOST)

console.log(`Running on http://${HOST}:${PORT}`)
