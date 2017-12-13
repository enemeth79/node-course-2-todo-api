var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

// var newTodo = new Todo({
//   text: 'Cook dinner'
// });
//
// newTodo.save().then(
//   (doc) => { console.log('Saved todo', doc)},
//   (err) => { console.log('Unable to save todo', err); }
// );

// var newTodo2 = new Todo({
//   text: 'Eat dinner',
//   completed: true,
//   completedAt: 123
// });
//
// newTodo2.save().then(
//   (doc) => { console.log(JSON.stringify(doc, undefined, 2)); },
//   (err) => { console.log('Unable to save', err); }
// );

// var newTodo3 = new Todo({
//   text: true
// });
//
// newTodo3.save().then(
//   (doc) => { console.log(JSON.stringify(doc, undefined, 2)); },
//   (err) => { console.log('Unable to save', err); }
// );

// User:
// email: required, trimmed, string, minlength 1
var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
});

var newUser = new User(
  { email: '  email2@gmail.com  '}
);

newUser.save().then(
  (doc) => { console.log(JSON.stringify(doc, undefined, 2)); },
  (err) => { console.log('Unable to save user', err); }
);
