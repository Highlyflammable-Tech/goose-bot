const {Embed} = require("../../structures/index.js")
module.exports = {
  name: 'suggest',
  description: 'description',
  args: true, //if it needs arguments or not (bit broken)
  argsnum: 0, //how many arguments (bit broken)
  usage: "<Your suggestion>", //what the arguments should be
  cooldown: 30,
  aliases: [], //other ways to call the command
  disabled: false,
  reason: "reason here!", // the reason why its disabled
  developer: false, //bot owner only
  execute(msg, args, client, db, config) {
    if(args[0]===undefined)return client.createMessage(msg.channel.id,"You are missing your suggestion")
    // counting docs for new id
    db.db("data").collection("suggestions").countDocuments(function(err, count_res) {
      const embed = new Embed()
        .color()
        .timestamp()
        .title(`New suggestion!`)
        .author(msg.author.username, msg.author.avatarURL)
        .description(args.join(" "))
        .footer(`Id: ${count_res+1}`)
      //sending embed
      client.createMessage(config.suggestion_channel, embed)
        .then(message => {
          //adding to db before adding reactions so the bot won't get confused
          db.db("data").collection("suggestions").insertOne({
            add_trello:false,
            user_id: msg.author.id,
            msg: message.id,
            suggestion: args.join(" "),
            up: 0,
            down: 0,
            id: count_res + 1,
            added:false
          }, async function(err, res) {
            if (err) return client.createMessage(msg.channel.id, "There was a problem adding to database");
            await message.addReaction("👍")
            await message.addReaction("👎")
          })
        })
    })
  },
};
