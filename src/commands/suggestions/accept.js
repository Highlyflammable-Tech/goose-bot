module.exports = {
  name: 'accept',
  description: 'accepts a suggestion',
  args: true, //if it needs arguments or not (bit broken)
  argsnum: 1, //how many arguments (bit broken)
  usage: "<Suggestion id>", //what the arguments should be
  cooldown: 0,
  aliases: [], //other ways to call the command
  disabled: false,
  reason: "reason here!", // the reason why its disabled
  developer: false, //bot owner only
  execute(msg, args, client, db, config) {
    //checking for admin perm//
    if (msg.channel.guild.members.get(msg.author.id).permission.json.administrator !== true) return
    db.db("data").collection("suggestions").findOne({
      id: parseInt(args[0])
    }, async function(err, res) {
      if (err) return client.createMessage(msg.channel.id, "There was a problem finding suggestion")
      if (!res) return client.createMessage(msg.channel.id, "I couldn't find that suggestion")
      if (!res.added) {
        client.getMessage(config.suggestion_channel, res.msg)
          .then((message) => {
            try {
              client.trello.addCard(message.embeds[0].author.name + ": " + res.id, res.suggestion, config.trello.lists.accepted, function(res2, response) {
                db.db("data").collection("suggestions").updateOne({
                  msg: res.msg
                }, {
                  $set: {
                    added: true,
                    trello: {
                      id: response.id,
                      list: config.trello.lists.accepted
                    }
                  }
                }, function(err, res) {
                  if (err) throw err;
                })
              })
            } catch (e) {
              client.createMessage(msg.channel.id, "There was a problem creating card on trello or updating database")
              throw e;
            }
          })
      }
      //adding reaction
      await client.addMessageReaction(config.suggestion_channel, res.msg, "🔧")
    })
  },
};
