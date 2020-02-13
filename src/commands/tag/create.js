const {Tag}=require("../../structures/index.js")
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
  //--code goes here--//
	let name = args.shift()
	let message = args.join(" ")
	const tag = New Tag()
		.owner(msg.author.id)
		.date()
		.name(name)
		.message(message)
		.create(db)
		if(tag==="Tag created") client.createMessage(msg.channel.id,`${name} has been created by \`${msg.author.username}\``)
		console.log(tag);
	},
};
