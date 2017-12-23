var mongoose = require('mongoose');

let db = {
  localhost: 'mongodb://localhost:27017/TodoApp',
  mlab: 'mongodb://mymongodbuser:Ezegyjojelszo@ds131237.mlab.com:31237/node-todo-app-api'
};

mongoose.Promise = global.Promise;
mongoose.connect(process.env.PORT ? db.mlab : db.localhost);

module.exports = { mongoose };
