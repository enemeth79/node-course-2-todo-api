var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT;

// create = POST
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  // console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then(
    (doc) => { res.send(doc); },
    (err) => { res.status(400).send(err); }
  );

});


app.get('/todos', (req, res) => {
    Todo.find().then(
      (todos) => {
        res.send({todos});
      },
      (err) => { res.status(400).send(err); }
    );
});


app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  //valid id using isValid
  if (!ObjectID.isValid(id)) {
  // 404 not found, send back empty send
    return res.status(404).send();
  }

  //findById
  Todo.findById(id)
    .then(
    //success
    (todo) => {
      if (!todo) {
        // if no todo - 404 with empty body
        return res.status(404).send();
      }
        // if todo - send it back
      res.send({todo});
    }).catch((e) => {
      //error
      //400 - and send empty body back
      res.status(400).send();
    });
  });


app.listen(port,
  () => { console.log('Started up at port ${port}'); }
);

module.exports = { app };
