var express = require('express')
var app = express()
const Todo = require("./models/todo");

//create collection
app.get('/',function(request , response){
     response.send('Hello this is TODOLIST')
})

//add a task to the list
//if (status = false):pending or (status = true):done 
app.post('/tasks',function(request,response){
    let todo = new Todo(request.body);
    if(todo.status==undefined){
        todo.status='false'
    }
    todo.save((err, createdTodoObject) => {
        if (err) {
            response.status(500).send(err);
        }
        response.status(200).send(createdTodoObject);
    });
})

//view all items in the list
app.get('/tasks',function(request , response){
    Todo.find({},function (err,result){
        if(result===null){
            response.send("Id is wrong !! Don't have Data")
        } else {
            response.json(result)
        }
    })
})

//view a single task in the list
app.get('/tasks/:id',function(request , response){
    Todo.findOne({_id: request.params.id},function (err,result){
        if(result===null){
            response.send("Id is wrong !! Don't have Data")
        } else {
            response.json(result)
            // console.log(result)
        }
    })
})

//edit existing task
app.put('/tasks/:id', (request, response) => {
    Todo.findOneAndUpdate({_id:request.params.id},request.body, (err, result) => {
        if(result===null){
            response.send("Id is wrong !! Don't have Data")
        } else {
            if (err) {
                response.status(500).send(err)
            } else {
                response.status(200).send(result)
            }
        }
    })
})

//set the task status
app.put('/tasks/status/:id', (request, response) => {
    Todo.findById({_id:request.params.id}, (err, result) => {
        if(result===null){
            response.send("Id is wrong !! Don't have Data")
        } else {
            if (err) {
                response.status(500).send(err)
            } else {
                let change = true
                if(result.status){
                    change = false
                }
                result.status = change;
                result.save((err, todo) => {
                    if (err) {
                        response.status(500).send(err)
                    }
                    response.status(200).send(todo)
                })
            }
        }  
    })
})

//delete a task from the list
app.delete('/tasks/:id', (request, response) => {
    Todo.findByIdAndRemove(request.params.id, (err, result) => {
        if(result===null){
            response.status(404).send("Id is wrong !! Don't have Data")
        } else {
            let res = {
                message: "Todo successfully deleted",
                id: result._id,
                topic : result.topic
            }
            response.status(200).send(res)
        }
    })
})

module.exports = app;