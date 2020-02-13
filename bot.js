const {
  loaders,
  disabled_events,
  events,
  website
} = require("./src/index.js")

const config = require("./config.js")

const eris = require('eris', {
  disableEveryone: true,
  disableEvents: disabled_events(),
  maxShards: "1"
});

//database stuff//
const MongoClient = require('mongodb');
console.log("Trying to connect to db");
MongoClient.connect(config.db_token, {
  useUnifiedTopology: true
}, function(err, db) {
  if (err) throw err;
  else console.log("Connected to DB");
  //bot stuff//
  var token = config.dev_mode ? config.token.dev : config.token.main
  var client = new eris(token)
  client.config = config

  events(client, db, config)
  loaders(client, config)
  wesite(client,db,config)
  
  client.connect();
})
