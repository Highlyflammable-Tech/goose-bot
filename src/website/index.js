var http = require('http')
var createHandler = require('github-webhook-handler')
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

  handler.on('error', (error) => {
    console.error(error);
  })

  handler.on('issues',(event) => {
    if(event.payload.action==="opened"){
      //addd msg to issue
    }else if(event.payload.action ==="labeled")

  })
}
