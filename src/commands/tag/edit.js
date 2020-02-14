module.exports = {
	name: 'edit',
	description: 'edits the tags msg',
	args: true,//if it needs arguments or not
	argsnum: 0,//how many arguments (bit broken)
  usage:"<tag> <Message>",//what the arguments should be
	cooldown: 3,
  aliases: [],//other ways to call the command
  disabled: false,
  reason: "reason here!", // the reason why its disabled
  developer: false,//bot owner only
	nsfw: false,//if the command needs to be used in a nsfw channel
	execute(msg, args, client, db, config) {
		if(args.length<2)return client.createMessage(msg.channel.id,"You didn't provide the correct arguments\n`<tag> <New Message>`\nNames can only be one word")
		let name = args.shift()
		let new_msg = args.join("")
		//checking if user is tag owner
		db.db("data").collection("tags").findOne({
			name:name
		},function (err,res) {
			if(res===null)return client.createMessage(msg.channel.id,"I couldn't find that tag")
			if(res.owner!==msg.author.id)return client.createMessage(msg.channel.id,"Only the owner can edit that tag")
			db.db("data").collection("tags").updateOne({
				name:name
			},{
				$set:{
					msg:new_msg
				}
			},function (err,res) {
				if(err){
					console.error(err);
					return client.createMessage(msg.channel.id,"There was a problem editing tag")
				}
				return client.createMessage(msg.channel.id,"The Tag has been updated!")

			})
		})
	},
};
