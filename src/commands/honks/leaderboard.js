const {Embed} = require("../../structures/index.js")
module.exports = {
	name: 'leaderboard',
	description: 'description',
	args: false,//if it needs arguments or not (bit broken)
	argsnum: 0,//how many arguments (bit broken)
  usage:"<usage here>",//what the arguments should be
	cooldown: 5,
  aliases: ['lb','l'],//other ways to call the command
  disabled: false,
  reason: "reason here!", // the reason why its disabled
  developer: false,//bot owner only
	nsfw: false,//if the command needs to be used in a nsfw channel
	execute(msg, args, client, db, config) {
    db.db("data").collection("points").find().sort({
      points:-1
    }).toArray(function (err,res) {
      if(err){
        console.error(err);
        return client.createMessage(msg.channel.id,"There was a problem getting the leaderboard")
      }
      let description= ""
      for (var i = 0; i < 11; i++) {
        if(i===res.length)break;
        description+=`${i+1}.<@${res[i].user_id}> : ${res[i].points}`
      }
      const embed = new Embed()
        .color()
        .timestamp()
        .title("Here is the leaderboard")
        .description(description)
        .send(client,msg)
    })
	},
};
