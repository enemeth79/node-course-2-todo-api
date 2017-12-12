// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect(
  'mongodb://localhost:27017/TodoApp',
  (err, db) => {
    if (err) {
      return console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server.');

    // db.collection('Todos').find(
    //   //{completed: true}
    //   {_id:  new ObjectID('5a2fe9e423dd017a4112091c')}
    // )
    //   .toArray().then(
    //   (docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    //   },
    //   (err) => {
    //     console.log('Ubable to fetch todos', err);
    // });

    // db.collection('Todos').find()
    //   .count()
    //   .then(
    //   (count) => {
    //     console.log(`Todos count: ${count}`);
    //
    //   },
    //   (err) => {
    //     console.log('Ubable to fetch todos', err);
    // });
    db.collection('Users').find({name:'Erzsebet'}).toArray()
      .then(
        (docs) => { console.log('Users');
        console.log(JSON.stringify(docs, undefined, 2));
      },
      (err) => { console.log('Unable to fetch users', err);}
    );

    // db.close();
  }
);
