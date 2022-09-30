require('dotenv').config()
require('./config/database')
const Router = require('./routes/route')
const express = require ('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use('/api', Router)

app.get ('/', (req, res) => { res.send('SERVIDOR CREADO!') })
app.listen(PORT, () => {
    console.log('SERVIDOR CORRIENDO EN PUERTO: ' + PORT)
})