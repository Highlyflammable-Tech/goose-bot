const {Embed} = require("../../structures/index.js")
module.exports = function(client, db, config) {
  client.on("messageReactionAdd", (msg, emoji, user) => {
    //checking if channel is suggestion channel
    if (msg.channel.id !== config.suggestion_channel) return;
    if (emoji.name !== "👎" || emoji.name !== "👍") return;
    db.db("data").collection("suggestions").findOne({
      msg: msg.id
    }, function(err, res) {
      if (err) throw err;
      if (res.up >= 10 && res.up >= res.down) {
        client.getMessage(msg.channel.id,msg.id)
        .then((message) => {
          const embed = new Embed(message.embeds[0])
            .color("#00ff00")
          client.editMessage(msg.channel.id,msg.id,embed)
        })
      } else {
        db.db("data").collection("suggestions").updateOne({
          msg: msg.id
        }, {
          $set: {
            up: res.up + ((emoji.name === "👍") ? 1 : 0),
            down: res.down + ((emoji.name === "👎") ? 1 : 0)
          }
        },function (err,res) {
          if(err)throw err;
        })
      }
    })
  })
}
