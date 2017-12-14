const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5a32976b45e194f407a9f9dc1';
// //var id = '6a32976b45e194f407a9f9dc';
//
// if (!ObjectID.isValid(id)) {
//   console.log('Id not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({_id: id})
//   .then((todo) => {console.log('Todo', todo)});

// Todo.findById(id)
//   .then((todo) => {
//     if (!todo) {
//       return console.log('Id not found');
//     }
//     console.log('Todo by id', todo)
//   })
//   .catch((e) => console.log(e));

// query users by id
var userid = '5a3130a9a82bbbc8311f241a';
// User.find({_id: userid})
//   .then((users) => { console.log('Users',users);});

User.findById(userid)
  .then(
    (user) => {
      if (!user) { console.log('unable to find user by id')}

      console.log(JSON.stringify(user, undefined, 2));
    },
    (err) => {console.log(err); }
  );
