const env        = require('dotenv')
const express    = require('express')
const mongoose   = require('mongoose')
const bodyParser = require('body-parser')
const cors       = require('cors')
const passport   = require('passport')
const path       = require('path')


env.config() // fired up environment variables
const app        = express() // Initializing express

// Defining the server port
const PORT = process.env.PORT || 5000

// Defining middlewares
app.use(cors())                                             // --> Cors
app.use(express.static(path.join(__dirname, 'public')))     // --> static dir
app.use(bodyParser.json())                                  // --> body-parser
app.use(passport.initialize())                              // --> Init passport
app.use(passport.session())                                 // --> passport session    

app.get('/', (req, res) => {
    return res.json({
        message: "This is node.js role based auth system"
    })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})