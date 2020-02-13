const fs = require('fs');
module.exports = function (client,db,config) {
  //getting all files//
  var event_files = fs.readdirSync('./src/events').filter(file => file.endsWith('.js') && file!=="index.js");
  //starting all events
  for (var files of event_files) require(`./${files}`)(client,db,config);
}
