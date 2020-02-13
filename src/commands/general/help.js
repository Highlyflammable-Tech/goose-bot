const{Embed}=require("../../structures/index.js")
module.exports = {
	name: 'help',
	description: 'the help command',
	args: false,//if it needs arguments or not
	argsnum: 0,//how many arguments (bit broken)
  usage:"<usage here>",//what the arguments should be
	cooldown: 5,
  aliases: [],//other ways to call the command
  disabled: false,
  reason: "reason here!", // the reaso why its disabled
  developer: false,//bot owner only
	nsfw: false,//if the command needs to be used in a nsfw channel
	execute(msg, args, client, db, config) {
    if(args.length===0){
			const embed = new Embed()
			 .color()
			 .timestamp()
			 .title("Here are my commands")
			 .description(`Use \`${config.prefix}Help [Category]\`\nE.g. \`${config.prefix}Help Tag\`\n\`<>\` are needed for the command\n\`[]\` are need for the command`)
			 .addField("__General Commands__","`Help` Shows you this beautiful message\n")
			 .addField("__Tag Commands__","`Create <name> <message>` Creates a new tag. Names can only be one word\n`Delete <Name>` Deletes a tag\n`Edit <New Message>` Edits the message on a tag\n`Info <Name>` Info about the tag\nTag <Name>` Shows the tag")
			 .addField("__Honks__","`View [@user]` Shows the number of honks the user has")
			client.createMessage(msg.channel.id,embed)
    }
	},
};
