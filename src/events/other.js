module.exports = function(client,db,config) {
  client.on("ready", () => {
    console.log(`Bot logged as ${client.user.username}#${client.user.discriminator}`);
    if (config.dev_mode) {
      client.editStatus("online", {
        name: `somone trying to code`,
        type: 3
      })
    } else{
      client.editStatus("online", {
        name: `For Honks`,
        type: 3
      })
    }
  })
  process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

  if (config.dev_mode) {
    client.on("debug", (msg) => console.info(`Debug: ` + msg))
    client.on("error", (e) => console.error(`Error: ` + e))
    client.on("warn", (warn) => console.warn(`Warn: ` + warn))
  }
}
