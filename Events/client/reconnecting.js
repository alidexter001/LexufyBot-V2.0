var colors = require('colors');

module.exports = (client)=>{
    console.log(`[${colors.yellow('CLT')}] Reconnecting to The Client <${colors.cyan(`${client.user.tag}`)}>`)
}