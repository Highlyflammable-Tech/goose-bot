var http = require('http')
const {github} = require("../structures/index.js")
var createHandler = require('github-webhook-handler')

module.exports = function(client, db, config) {
  //creating server for webhooks to come in//
  var handler = createHandler({
    path: "/webhook",
    secret: config.github_secret
  });
  http.createServer(function(req, res) {
      handler(req, res, function(err) {
        res.statusCode = 404;
        res.end("no such location");
      });
    })
    .listen(3000 || process.env.PORT);
  //handler stuff
  handler.on("issues", event => {
    if (event.payload.action === "labeled" && (event.payload.label.name === "destructive" || event.payload.label.name === "malicious")) {
      //closing and commenting issue//
      try {
        github.close(event, config)
        github.comment(event,"We do not allow mod requests that are considered destructive or malicious. Sorry!",config)
      } catch (e) {
        console.error(e);
      }
      // TODO: pass to discord webhook
    }
  })
}
