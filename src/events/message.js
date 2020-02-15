const {
  Collection
} = require('eris');
module.exports = function(client, db, config) {
  //command stuff//
  const cooldowns = new Collection();
  //--command handling--//
  client.on('messageCreate', message => {
    if (message.author.bot) return;
    if (message.channel.type !== 0) return;
    //prefix stuff
    var prefix =config.prefix
    if (message.content.startsWith(prefix)) var args = message.content.slice(prefix.length).toLowerCase().split(/ +/);
    else if (message.content.startsWith(client.user)) var args = message.content.slice(`<@${client.user.id}>`.length).toLowerCase().split(/ +/);
    else return not_command(message, db, client, config);
    //args stuff//
    if (args[0] == "") args.shift()
    const commandName = args.shift();
    //finding command//
    const command = client.commands.get(commandName) ||
      client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return not_command(message, db, client, config);
    //checking channel perms to see if the bot can send msg to it//
    if (message.channel.permissionsOf(client.user.id).json.sendMessages !== true) return console.log("No perm");
    //for dev only commands when in dev_mode//
    if (config.dev_mode && message.author.id != config.owner_id) return;
    // developer command //
    if (command.developer && message.author.id != config.owner_id) return;
    // disabled command //
    if (command.disabled && message.author.id != config.owner_id) {
      let reply = `\n\`${command.name}\` has been disabled!`
      if (command.reason) reply += `\nReason: \`${command.reason}\``
      client.createMessage(message.channel.id, reply).then((msg) => {
        setTimeout(function() {
          msg.delete()
        }, 7500);
      })
      return;
    }
    // nsfw //
    if (!config.dev_mode && command.nsfw && !message.channel.nsfw) {
      client.createMessage(message.channel.id, `\`${command.name}\` needs to be used in a NSFW channel!`).then((msg) => {
        setTimeout(function() {
          msg.delete()
        }, 7500);
      })
      return;
    }

    // args //
    if (command.args) {
      if (args[0] === null) {
        let reply = `You didn't provide any arguments, ${message.author.mention}!`;
        if (command.usage) {
          reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }
        return client.createMessage(message.channel.id, reply);
      } else if (command.argsnum !== 0 && (args.length !== command.argsnum)) {
        let reply = `You didn't provide any arguments, ${message.author.mention}!`;
        if (command.usage) {
          reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
          return client.createMessage(message.channel.id, reply);
        }
      }
    }
    // cooldown //
    if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Collection());

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return client.createMessage(message.channel.id, `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    //running command//
    try {
      command.execute(message, args, client, db, config);
    } catch (error) {
      console.error(error);
      if (config.dev_mode) {
        client.createMessage(message.channel.id, 'this shouldn\'t have happened');
      } else client.createMessage(message.channel.id, error.message)
    }
  });
};

async function not_command(msg, db, client, config) {
  if(msg.channel.id===config.suggestion_channel){
    await msg.addReaction("👍")
    await msg.addReaction("👎")
  }
  let points = Math.floor(Math.random() * Math.floor(3))
  if(msg.content.startsWith("honk"))point*=2
  db.db("data").collection("points").findOne({
    user_id:msg.author.id
  },function (err,res) {
    if(res===null){
      db.db("data").collection("points").insertOne({
        user_id:msg.author.id,
        points:points
      })
    }else {
      db.db("data").collection("points").updateOne({
        user_id:msg.author.id
      },{
        $set:{
          points:res.points+points
        }
      })
    }
  })
}
