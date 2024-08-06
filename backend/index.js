const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}))
app.use(bodyParser.json())
const cors = require('cors')
app.use(cors())
const appRouter = require('./routes/app.route')
app.use('/', appRouter)

const mongoose = require('mongoose')
const URI = process.env.URI
mongoose.connect(URI, (err)=>{
    if(err){
        console.log('Mongoose disconected due to network connectivity', err)
    }else{
        console.log('Mongoose connected successfully')
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))