const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

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

app.delete('/todos/:id', (req, res) => {
  // get the id
  var id = req.params.id;

  // validate id -> not valid? return 404
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // remove todo by id
    Todo.findByIdAndRemove(id)
      .then(
//  success
        (todo) => {
          //      if no doc -> not found, send 404 with empty body
          if (!todo) {
            return res.status(404).send();
          }
  //      if doc -> send doc back with 200
          res.send({todo});
        }
      )
  //  error -> return 400 with empty body
      .catch((e) => {
        res.status(400).send();
      });
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  // two properties are allowed to modify by user
  var body = _.pick(req.body, ['text', 'completed']);

  // validate id -> not valid? return 404
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id,
    {
      $set: body
    },
    {
      new: true
    })
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({todo});
    })
    .catch((e) => {
      res.status(400).send();
    })

});




app.listen(port,
  () => { console.log(`Started up at port ${port}`); }
);

module.exports = { app };
