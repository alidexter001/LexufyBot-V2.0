var colors = require('colors');
const {BOT_PRESENCE} =require(`${process.cwd()}/config.js`)
module.exports = async(client) => {
    console.log(`[${colors.green('CLIENT')}] Successfully connected to ${colors.green('<')}${colors.blue(client.user.tag)}(${colors.yellow(client.user.id)})${colors.green('>')}`);
    client.manager.init(client.user.id);

    if (BOT_PRESENCE.ENABLED) {
        updatePresence(client);
        setInterval(() => updatePresence(client), 60 * 1000);
      }
}
const updatePresence = (client) => {
    let message = BOT_PRESENCE.MESSAGE;
  
    if (message.includes("{servers}")) {
      message = message.replaceAll("{servers}", client.guilds.cache.size);
    }
  
    if (message.includes("{users}")) {
      const members = client.guilds.cache.map((g) => g.memberCount).reduce((partial_sum, a) => partial_sum + a, 0);
      message = message.replaceAll("{users}", members);
    }
  
    client.user.setPresence({ activities: [{ name: message, type: BOT_PRESENCE.TYPE }], status: BOT_PRESENCE.STATUS,});
  };