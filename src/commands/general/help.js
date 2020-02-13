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
    if(args[0]===null){
      
    }
	},
};
