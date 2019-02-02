const mongoose = require("mongoose")
mongoose.set('useFindAndModify', false)
const Schema = mongoose.Schema

const todoSchema = new Schema({
    topic:  String,
    description: String,
    status: Boolean
},
{
    collection:'tasks'
})
module.exports = mongoose.model('tasks',todoSchema)