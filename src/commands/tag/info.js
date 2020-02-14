const {Embed}=require("../../structures/index.js")
module.exports = {
	name: 'info',
	description: 'Gets info about a tag',
	args: true,//if it needs arguments or not (bit broken)
	argsnum: 0,//how many arguments (bit broken)
  usage:"<Tag Name>",//what the arguments should be
	cooldown: 0,
  aliases: [],//other ways to call the command
  disabled: false,
  reason: "reason here!", // the reason why its disabled
  developer: false, //bot owner only
	nsfw: false, //if the command needs to be used in a nsfw channel
	execute(msg, args, client, db, config) {
    db.db("data").collection("tags").findOne({
      name:args[0]
    },function (err,res) {
      if(err){
        console.error(err);
        return client.createMessage(msg.channel.id,"There was a problem finding the tag")
      }
      if(res===null)return client.createMessage(msg.channel.id,"I couldn't find that tag")
      const embed = new Embed()
        .color()
        .title("Tag Info")
        .timestamp(res.created)
        .description(`Created by : <@${res.owner}>\nName: ${res.name}`)
        .footer("Created ->")
      client.createMessage(msg.channel.id,embed)
    })
	},
};
