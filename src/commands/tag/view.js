module.exports = {
	name: 'tag',
	description: 'description',
	args: true,//if it needs arguments or not
	argsnum: 0,//how many arguments (bit broken)
  usage:"<name>",//what the arguments should be
	cooldown: 0,
  aliases: ['t'],//other ways to call the command
  disabled: false,
  reason: "reason here!", // the reaso why its disabled
  developer: false,//bot owner only
	nsfw: false,//if the command needs to be used in a nsfw channel
	execute(msg, args, client, db, config) {
		
	},
};
