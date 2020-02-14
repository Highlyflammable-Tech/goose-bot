var http = require('http')
var createHandler = require('github-webhook-handler')
const github_stuff= require("./github.js")
module.expots = function(client, db, config) {
  var handler = createHandler({
    path: '/webhook',
    secret: config.webhook_token
  })
  http.createServer(function(req, res) {
      handler(req, res, function(err) {
        res.statusCode = 404
        res.end('no such location')
      })
    })
    .listen(3000 || process.env.PORT)

    github_stuff(handler,http,config)
}
