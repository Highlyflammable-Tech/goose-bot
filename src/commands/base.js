module.exports = {
	name: 'name',
	description: 'description',
	args: false,//if it needs arguments or not (bit broken)
	argsnum: 0,//how many arguments (bit broken)
  usage:"<usage here>",//what the arguments should be
	cooldown: 5,
  aliases: ['aliases'],//other ways to call the command
  disabled: false,
  reason: "reason here!", // the reason why its disabled
  developer: false,//bot owner only
	execute(msg, args, client, db, config) {
  //--code goes here--//
	},
};
