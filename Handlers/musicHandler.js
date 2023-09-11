const fs = require('fs');
const path = require('path');
var colors = require('colors');

module.exports = async(client) => {
    console.log(`[${colors.green('HANDLERS')}] Loading ${colors.cyan('Node Events...')}`);
    fs.readdirSync(`${process.cwd()}/Events/music`)
    .filter((file)=> file.endsWith('.js'))
    .forEach(file => {
        const pull = require(`${process.cwd()}/Events/music/${file}`)
        let eventName = file.split('.')[0];
        client.manager.on(eventName, pull);
    })
};