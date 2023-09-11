const client = require(`${process.cwd()}/bot.js`).client;
module.exports = async(d)=>{
    client.manager.updateVoiceState(d)
}