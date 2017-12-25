const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}) - delete all
// Todo.remove({}).then(
//   (result) => { console.log(result); }
// );

// Todo.findOneAndRemove
// Todo.findByIdAndRemove


 Todo.findByIdAndRemove('5a418abd1ddfcd160f190f5f')
   .then((todo) => { console.log(todo);});
