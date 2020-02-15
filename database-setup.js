const {
  db_token
} = require("./config.js")
//database stuff//
const MongoClient = require('mongodb');
console.log("Trying to connect to db");
MongoClient.connect(db_token, {
  useUnifiedTopology: true
}, function(err, db) {
  if (err) throw err;
  //checking if db is already setup
  let needed_collections = {
    "points": false,
    "tags": false,
  }
  db.db("data").listCollections().toArray(function(err, res) {
    for (collection of res) {
      if (!needed_collections[collection.name] === null) continue;
      needed_collections[collection.name] = true
    }
    //looping through and creating collection
    for (var name in needed_collections) {
      if (!needed_collections[name]) {
        db.db("data").createCollection(name, {}, function(err, res) {
          if (err) console.error(err);
          console.log(`Created ${name}`);
        })
      }else console.log(`${name} is already a collection`);
    }
    console.log("Done!");
  })
})
