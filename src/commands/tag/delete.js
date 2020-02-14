module.exports = {
	name: 'delete',
	description: 'Deletes a tag',
	args: true,//if it needs arguments or not (bit broken)
	argsnum: 0,//how many arguments (bit broken)
  usage:"<Tag Name>",//what the arguments should be
	cooldown: 5,
  aliases: ["d"],//other ways to call the command
  disabled: false,
  reason: "reason here!", // the reason why its disabled
  developer: false,//bot owner only
	nsfw: false,//if the command needs to be used in a nsfw channel
	execute(msg, args, client, db, config) {
    db.db("data").collection("tags").findOne({
      name:args[0]
    },function (err,res) {
      if(err){
        console.error(err);
        return client.createMessage(msg.channel.id,"There was a problem finding the tag")
      }
      if(res===null)return client.createMessage(msg.channel.id,"I couldn't find that tag")
      //checking if user is owner or admin
      if(res.owner!==msg.author.id){
        if(msg.channel.guild.members.get(msg.author.id).permission.json.administrator !==true)return client.createMessage(msg.channel.id,"Sorry you can't delete this")
      }
      db.db("data").collection("tags").deleteOne({
        name:args[0]
      },function (err,res) {
        if(err){
          console.error(err);
          return client.createMessage(msg.channel.id,"There was a problem deleting the tag")
        }
        client.createMessage(msg.channel.id,"The tag has been deleted")
      })
    })
	},
};
