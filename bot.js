const Client = require('./Clients/Client');
require('dotenv').config();
var colors = require('colors');
const { Collection } = require('discord.js');
const config = require('./config.js');
const Genius = require("genius-lyrics");
const {QuickDB}  = require("quick.db");
const path = require('path');
const AntiSpam = require("discord-anti-spam");

const client = new Client();

module.exports.client = client;

// Slash Commands deployment settings
client.deploySlash = {
    enabled: true,
    guild: false, // false | "ID" (if it's false, just set global once, and then never needed again!)
};

client.commands = new Collection();
client.slashCommands = new Collection();

client.genius = new Genius.Client(config.GENIUS.TOP_SECRET_API_KEY);
client.db = new QuickDB({
    filePath: `${process.cwd()}/database/database.sqlite`
});


require('./Clients/MusicManager.js')(client);

//Loading Events
require('./Handlers/clientHandler.js')(client);
require('./Handlers/musicHandler.js')(client);
require('./dashboard/app.js');

//Client Bot
if(!process.env.TOKEN) {
    console.log(`[${colors.red('CLT')}] You Have To Provide A Valid Bot Token`);
    process.exit();
} else {
    client.login(process.env.TOKEN)
}