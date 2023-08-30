const client = require(`../../bot.js`).client;
const config  = require(`${process.cwd()}/config.js`)
let db = client.db;
module.exports = {
    name: '/dashboard',
    run: async(req, res) => {
        const access_token = req.cookies.access_token

        if(!await db.get(`UserId_${access_token}`)) return res.redirect('/auth');

        delete require.cache[require.resolve("../HTML/dashboard.ejs")];

        let args = {
            users: (await client.guilds.cache).reduce((a,g) => a + g.memberCount, 0).toLocaleString(),
            guilds: (await client.guilds.cache).size,
            commands: await client.slashCommands.size,
            usedCommands: await client.db.get('command_used') || 0,
            botname: client.user.username,
            botAvatar: client.user.avatarURL(),
            botAvatarURL: client.user.displayAvatarURL({ size: 256 }),
            owner: client.users.cache.get(config.OWNER_ID).username,
            botInvite: `https://discord.com/api/oauth2/authorize?client_id=${config.CLIENT_ID}&permissions=${config.PERMISSIONS}&scope=bot%20applications.commands`,
            serverInvite: config.SUPPORT_SERVER
        }
        if(access_token)
            res.render(`HTML/dashboard.ejs`, args)
        else return res.redirect('/auth');
    }
}