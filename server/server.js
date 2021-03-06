require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

// create = POST
app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
  // console.log(req.body);
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then(
    (doc) => { res.send(doc); },
    (err) => { res.status(400).send(err); }
  );

});

app.get('/todos', authenticate, (req, res) => {
    Todo.find({_creator: req.user._id}).then(
      (todos) => {
        res.send({todos});
      },
      (err) => { res.status(400).send(err); }
    );
});


app.get('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  //valid id using isValid
  if (!ObjectID.isValid(id)) {
  // 404 not found, send back empty send
    return res.status(404).send();
  }

  //findById
  Todo.findOne({_id: id, _creator: req.user._id})
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

app.delete('/todos/:id', authenticate, (req, res) => {
  // get the id
  var id = req.params.id;

  // validate id -> not valid? return 404
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // remove todo by id
    Todo.findOneAndRemove({_id: id, _creator: req.user._id})
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

app.patch('/todos/:id', authenticate, (req, res) => {
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

  Todo.findOneAndUpdate({_id: id, _creator: req.user._id},
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


app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(
    () => {
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(user);
    })
    .catch((e) => {
     res.status(400).send(e);
  })
});



app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});


app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
      return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);
      });
  }).catch((e) => {
    res.status(400).send();
  });
});


app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.listen(port,
  () => { console.log(`Started up at port ${port}`); }
);

module.exports = { app };
