// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect(
  'mongodb://localhost:27017/TodoApp',
  (err, db) => {
    if (err) {
      return console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server.');

    // db.collection('Todos').findOneAndUpdate(
    //   {_id: new ObjectID("5a2ff47f23dd017a41120a54")},
    //   {$set: {completed: true}},
    //   {returnOriginal: false}
    // )
    // .then(
    //   (result => { console.log(result);})
    // );

    db.collection('Users').findOneAndUpdate(
      {_id: new ObjectID("5a217a1ff95ebf29f4beabb2")},
      {$set: {name: 'Erzsebet'},
       $inc: { age : 1 }
      },
      {returnOriginal: false}
    )
    .then(
      (result) => {console.log(result);}
    )


    // db.close();
  }
);
