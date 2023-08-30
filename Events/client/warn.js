var colors = require('colors');

module.exports = (client) =>{
    console.log(`[${colors.yellow('CLT')}] a Warning has Accured while connecting to <${colors.cyan(`${client.user.tag}`)}>`)
}