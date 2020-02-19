module.exports = {
  name: 'accept',
  description: 'accepts a suggestion',
  args: true, //if it needs arguments or not (bit broken)
  argsnum: 1, //how many arguments (bit broken)
  usage: "<Suggestion id>", //what the arguments should be
  cooldown: 0,
  aliases: [], //other ways to call the command
  disabled: false,
  reason: "reason here!", // the reason why its disabled
  developer: false, //bot owner only
  execute(msg, args, client, db, config) {
    //checking for admin perm//
    if (msg.channel.guild.members.get(msg.author.id).permission.json.administrator !== true) return
    db.db("data").collection("suggestions").findOne({
      id: parseInt(args[0])
    }, async function(err, res) {
      if (err) return client.createMessage(msg.channel.id, "There was a problem finding suggestion")
      if (!res) return client.createMessage(msg.channel.id, "I couldn't find that suggestion")
      if(res.trello.id==="no")return client.createMessage(msg.channel.id, "That suggest has been denied")
      await client.addMessageReaction(config.suggestion_channel,res.msg,"🔧")
      //adding to trello

      if(res.added){
        try{
          client.trello.makeRequest("put",`/1/cards/${res.trello.id}/idList`,{value:config.trello.lists.accepted},function (res,response) {
            if(res!==null){
              client.createMessage(msg.channel.id,"There was an error moving card on trello")
              throw res;
            }
            db.db("data").collection("suggestions").updateOne({
              id:parseInt(args[0])
            },{
              $set:{
                add_trello:true
              }
            },function (err,res) {
              if(err){
                client.createMessage(msg.channel.id,"There was problem updating database")
                throw err;
              }
            })
          })
        }catch (e){
          throw e;
        }
      }
    })
  },
};
