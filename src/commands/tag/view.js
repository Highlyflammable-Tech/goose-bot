module.exports = {
	name: 'tag',
	description: 'views the tag',
	args: true,//if it needs arguments or not
	argsnum: 1,//how many arguments (bit broken)
  usage:"<Tag Name>",//what the arguments should be
	cooldown: 0,
  aliases: ['t'],//other ways to call the command
  disabled: false,
  reason: "reason here!", // the reaso why its disabled
  developer: false,//bot owner only
	nsfw: false,//if the command needs to be used in a nsfw channel
	execute(msg, args, client, db, config) {
		db.db("data").collection("tags").findOne({
			name:args[0]
		},function (err,res) {
			if(err)console.error(err);
			if(res===null)return;
			client.createMessage(msg.channel.id,res.msg)
		})
	},
};
