const client = require(`../../bot.js`).client;
const config  = require(`${process.cwd()}/config.js`)

module.exports = {
    name: '/home',
    run: async(req, res) => {
        delete require.cache[require.resolve("../HTML/home.ejs")];
        const commandsByCategory = new Map();
        client.slashCommands.forEach(command => {
            if (!commandsByCategory.has(command.category)) {
              commandsByCategory.set(command.category, []);
            }
            commandsByCategory.get(command.category).push(command);
        });
        let args = {
            users: (await client.guilds.cache).reduce((a,g) => a + g.memberCount, 0).toLocaleString(),
            guilds: (await client.guilds.cache).size,
            commands: await client.slashCommands.size,
            botname: client.user.username,
            botAvatar: client.user.avatarURL(),
            botAvatarURL: client.user.displayAvatarURL({ size: 256 }),
            owner: client.users.cache.get(config.OWNER_ID).username,
            botInvite: `https://discord.com/api/oauth2/authorize?client_id=${config.CLIENT_ID}&permissions=${config.PERMISSIONS}&scope=bot%20applications.commands`,
            serverInvite: config.SUPPORT_SERVER,
            commandsByCategory: commandsByCategory
        }
        res.render("HTML/home.ejs", args)
    }
}