// fired up environment variables
const env        = require('dotenv')
env.config() 

// Importing official middlewares
const express    = require('express')
const mongoose   = require('mongoose')
const bodyParser = require('body-parser')
const cors       = require('cors')
const passport   = require('passport')
const path       = require('path')
 
// Initializing express
const app        = express()

// connect to the database
const db = require('./config/database')
db.run(mongoose)

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

// User routes
const users = require('./routes/users')
app.use('/api/users', users)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})