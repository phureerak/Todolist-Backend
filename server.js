const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const todos = require('./app/app')

const port = 3000

//before command docker-compose up , Please change var conectDB to 'mongo'
//'localhost' just use in local

var conectDB = 'localhost'
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(todos)

const mongoose = require('mongoose')

mongoose
    .connect(
        "mongodb://"+conectDB+":27017/todolist",
        { useNewUrlParser: true }
    )
    .then(()=>console.log("MongoDB Conect"))
    .catch(err=> console.log(err))

app.listen(port)
console.log("Listening on port " + port)

module.exports = app