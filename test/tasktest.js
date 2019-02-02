let todo = require('../app/models/todo');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Todolist', () => {
    beforeEach((done) => {
        //clean data in collection
        todo.remove({}, (err) => { 
           done();           
        });        
    });
    //Test the /GET/tasks
    describe('/GET tasks', () => {
        it('it should GET all the tasks', (done) => {
            chai.request(server)
                .get('/tasks')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                done();
                });
        });
    });
  
    //Test the /POST/tasks/
    describe('/POST tasks', () => {
        it('it should POST a task ', (done) => {
            let task = {
                topic: "do Rings",
                description: "Tolkien",
                status: false
            }
        chai.request(server)
            .post('/tasks')
            .send(task)
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('topic').equal(task.topic);
                    res.body.should.have.property('description').equal(task.description);
                    res.body.should.have.property('status').equal(task.status);
                done();
            //console.log(res.body.should.have.property('topic'));
            });
        });
    });

    //Test the /GET/tasks/:id
    describe('/GET/:id tasks', () => {
        it('it should GET a task by the given id', (done) => {
            let tasks = new todo({ 
                topic: "The Lord of the Rings", 
                description: "J.R.R. Tolkien", 
                status: false
            });
            tasks.save((err, task) => {
                chai.request(server)
                .get('/tasks/' + task.id) 
                .send(task.id)
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('topic');
                        res.body.should.have.property('description');
                        res.body.should.have.property('status');
                        res.body.should.have.property('_id').eql(task.id);
                    done();
                });
            // console.log(task.id)
            });
        });
    });

    //Test the PUT/tasks/:id & PUT/tasks/status/:id
    describe('/PUT/:id tasks', () => {
        //PUT/tasks/:id
        it('it should UPDATE a Task given the id', (done) => {
            let tasks = new todo({ 
                topic: "The Lord of the Rings", 
                description: "J.R.R. Tolkien", 
                status: false
            });
            tasks.save((err, task) => {
                chai.request(server)
                .put('/tasks/' + task.id)
                .send({ topic: "writing 3 2 1",description: "i want to eat pizza",status: false })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('topic');
                    res.body.should.have.property('description');
                    res.body.should.have.property('status');
                    res.body.should.have.property('_id').eql(task.id);
                    done();
                });
            });
        });
        //PUT/tasks/status/:id
        it('it should UPDATE a Task Status given the id', (done) => {
            let tasks = new todo({ 
                topic: "writing 3 2 1", 
                description: "i want to eat pizza", 
                status: false
            });
            tasks.save((err, task) => {
                chai.request(server)
                .put('/tasks/status/' + task.id)
                .send({ topic: "writing 3 2 1",description: "i want to eat pizza",status: true })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('topic');
                    res.body.should.have.property('description');
                    res.body.should.have.property('status').not.equal(tasks.status);
                    done();
                });
            });
        });
    });

    //Test the /DELETE/tasks/:id
    describe('/DELETE/:id tasks', () => {
        it('it should DELETE a task given the id', (done) => {
            let tasks = new todo({ 
                topic: "writing 3 2 1", 
                description: "i want to eat pizza", 
                status: false
            });
            tasks.save((err, task) => {
                chai.request(server)
                .delete('/tasks/' + task.id)
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Todo successfully deleted');
                    done();
                });
            });   
        });
     });
});