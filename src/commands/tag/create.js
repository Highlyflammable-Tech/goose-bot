const {Tag} =require("../../structures/index.js")
module.exports = {
	name: 'create-tag',
	description: 'creates a tag',
	args: true,
	argsnum: 0,
  usage:"<name> <message>\n`Names can only be one word",
	cooldown: 2,
  aliases: ['ct'],
  disabled: false,
  reason: "reason here!",
  developer: false,
	nsfw: false,
	execute(msg, args, client, db, config) {
		if(args.length<2)return client.createMessage(msg.channel.id,"You didn't provide the correct arguments\n`<name> <message>`\nNames can only be one word")
	let name = args.shift()
	let message = args.join(" ")
	const tag = new Tag()
		.owner(msg.author.id)
		.date()
		.name(name)
		.message(message)
    //checking if it already a tag//
    db.db("data").collection("tags").findOne({
      name:tag.name
    },function (err,result) {
      if(err)throw err;
      if(result!==null)return client.createMessage(msg.channel.id,"That tag has already been made!")
      //creating tag//
      db.db("data").collection("tags").insertOne(tag,function (err,res) {
        if(err){
					return client.createMessage(msg.channel.id,"There was a problem creating tag")
					console.error(err);
				}
				client.createMessage(msg.channel.id,`${name} has been created by \`${msg.author.username}\``)
      })
    })
	},
};
