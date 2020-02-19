const {
  Embed
} = require("../../structures/index.js")
module.exports = {
  name: 'deny',
  description: 'description',
  args: true, //if it needs arguments or not (bit broken)
  argsnum: 0, //how many arguments (bit broken)
  usage: "<Suggestion id> [Reason]", //what the arguments should be
  cooldown: 0.1,
  aliases: [], //other ways to call the command
  disabled: false,
  reason: "reason here!", // the reason why its disabled
  developer: false, //bot owner only
  execute(msg, args, client, db, config) {
    //checking for admin perm//
    if (msg.channel.guild.members.get(msg.author.id).permission.json.administrator !== true) return
    db.db("data").collection("suggestions").findOne({
      id: parseInt(args.shift())
    }, async function(err, res) {
      if (err) return client.createMessage(msg.channel.id, "There was a problem finding suggestion")
      if (!res) return client.createMessage(msg.channel.id, "I couldn't find that suggestion")
      //changing embed
      let reason = args[0] === undefined ? "None" : args.join(" ")
      let embed = new Embed()
        .color("#ff0000")
        .title("Suggestion denied")
        .description(`Suggestion from: <@${res.user_id}>\nReason: ${reason}`)
        .footer(`Denied by ${msg.author.username} || Denied ->`)
        .timestamp()
      client.editMessage(config.suggestion_channel, res.msg, embed)
      client.removeMessageReactions(config.suggestion_channel, res.msg)
      return;
      //deleting from trello if on it//
      if (res.added) {
        client.trello.deleteCard(res.trello.id, function(res) {
          if (res) throw res;
        })
      }
      db.db("data").collection("suggestions").updateOne({
        id: parseInt(args.shift())
      }, {
        $set: {
          trello: {
            id: "no"
          }
        }
      })
    })
  },
};
