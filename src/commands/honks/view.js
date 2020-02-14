const {Embed} = require("../../structures/index.js")
module.exports = {
	name: 'honks',
	description: '',
	args: false,//if it needs arguments or not (bit broken)
	argsnum: 0, //how many arguments (bit broken)
  usage:"[@user]", //what the arguments should be
	cooldown: 0,
  aliases: ['h','points','bal'], //other ways to call the command
  disabled: false,
  reason: "reason here!", // the reason why its disabled
  developer: false, //bot owner only
	nsfw: false, //if the command needs to be used in a nsfw channel
	execute(msg, args, client, db, config) {
		let user = (msg.mentions.length	===0) ? msg.author : msg.mentions[0]
		db.db("data").collection("points").findOne({
			user_id:user.id
		},function (err,res) {
			if(err){
				console.error(err);
				return client.createMessage(msg.channel.id,"There was an error finding user")
			}
			const embed = new Embed()
				.color()
				.timestamp()
				.author(user.username,user.avatarURL)
				.addField("Balance",res.points +" "+ ((res.points===1) ? "honk" : "honks"))
			client.createMessage(msg.channel.id,embed)
		})
	},
};
