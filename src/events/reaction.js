const {
  Embed
} = require("../structures/index.js")
const Trello = require('trello');
module.exports = function(client, db, config) {
  var trello = new Trello(config.trello.key, config.trello.user_token)
  client.trello = trello
  client.on("messageReactionAdd", (msg, emoji, user) => {
    if (user === client.user.id) return;
    //checking if channel is suggestion channel
    if (msg.channel.id !== config.suggestion_channel) return;
    if (emoji.name === "👎" || emoji.name === "👍") {
      db.db("data").collection("suggestions").findOne({
        msg: msg.id
      }, function(err, res) {
        if (err) throw err;
        if (true /*|| res.up >= 10 && res.up >= res.down && !res.added*/ ) {
          client.getMessage(msg.channel.id, msg.id)
            .then((message) => {
              delete message.embeds[0].type
              delete message.embeds[0].author.proxy_icon_url
              message.embeds[0].color = parseInt("00ff00", 16)
              client.editMessage(msg.channel.id, msg.id, {
                embed: message.embeds[0]
              })
              //adding to trello
              try {
                trello.addCard(message.embeds[0].author.name +": "+ res.id, res.suggestion, config.trello.lists.input, function(res2, response) {
                  //changing db
                  db.db("data").collection("suggestions").updateOne({
                    msg: msg.id
                  }, {
                    $set: {
                      up: res.up + ((emoji.name === "👍") ? 1 : 0),
                      down: res.down + ((emoji.name === "👎") ? 1 : 0),
                      added: true,
                      trello: {
                        id: response.id,
                        list: config.trello.lists.input
                      }
                    }
                  }, function(err, res) {
                    if (err) throw err;
                  })
                })
              } catch (e) {
                throw e;
              }
            })
        } else {
          db.db("data").collection("suggestions").updateOne({
            msg: msg.id
          }, {
            $set: {
              up: res.up + ((emoji.name === "👍") ? 1 : 0),
              down: res.down + ((emoji.name === "👎") ? 1 : 0)
            }
          }, function(err, res) {
            if (err) throw err;
          })
        }
      })
    }
  })
}
