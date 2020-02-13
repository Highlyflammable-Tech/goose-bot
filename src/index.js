module.exports = {
  events: require("./events/index.js"),
  disabled_events,
  loaders: require("./loaders/index.js"),
  website:require("./website/index.js")
}

function disabled_events() {
  /*
    true if it is disabled
    false if it is enabled
  */
  let events = {
    "CHANNEL_CREATE":true,
    "CHANNEL_UPDATE":true,
    "CHANNEL_DELETE":true,
    "GUILD_BAN_ADD":true,
    "GUILD_BAN_REMOVE":true,
    "GUILD_CREATE":false,
    "GUILD_DELETE":false,
    "GUILD_MEMBER_ADD":true,
    "GUILD_MEMBER_REMOVE":false,
    "GUILD_MEMBER_UPDATE":true,
    "GUILD_ROLE_CREATE":true,
    "GUILD_ROLE_DELETE":true,
    "GUILD_ROLE_UPDATE":true,
    "GUILD_UPDATE":true,
    "MESSAGE_CREATE":false,
    "MESSAGE_DELETE":true,
    "MESSAGE_DELETE_BULK":true,
    "MESSAGE_UPDATE":true,
    "PRESENCE_UPDATE":true,
    "TYPING_START":true,
    "USER_UPDATE":true,
    "VOICE_STATE_UPDATE":true
  }
  let return_array=[]
  for (var event in events) if(events[event])return_array.push(event)
  return return_array;
}
