const {Embed} = require("../../structures/index.js")
module.exports = {
  name: 'add',
  description: 'description',
  args: true, //if it needs arguments or not (bit broken)
  argsnum: 2, //how many arguments (bit broken)
  usage: "<@user> <points>", //what the arguments should be
  cooldown: 2,
  aliases: [], //other ways to call the command
  disabled: false,
  reason: "reason here!", // the reason why its disabled
  developer: false, //bot owner only
  nsfw: false, //if the command needs to be used in a nsfw channel
  execute(msg, args, client, db, config) {
    //--code goes here--//
    if(msg.channel.guild.members.get(msg.author.id).permission.json.administrator !==true)return client.createMessage(msg.channel.id,"Sorry you can'use this command")
    
    let user = (msg.mentions.length === 0) ? msg.author : msg.mentions[0]
    let points = parseInt(args[1])
    db.db("data").collection("points").findOne({
      user_id: user.id
    }, function(err, res) {
      if (res === null) {
        db.db("data").collection("points").insertOne({
          user_id: user.id,
          points: points
        })
      } else {
        db.db("data").collection("points").updateOne({
          user_id: user.id
        }, {
          $set: {
            points: res.points + points
          }
        })
        const embed = new Embed()
          .color()
          .timestamp()
          .author(user.username,user.avatarURL)
          .description(`${user.username} has been given ${points}\nOld balance: ${res.points}\nNew balance: ${res.points+points}`)
          .footer(`Updated by ${msg.author.username}`)

        client.createMessage(msg.channel.id,embed)
      }
    })
  },
};
