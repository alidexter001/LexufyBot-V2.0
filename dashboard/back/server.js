const { Permissions } = require('discord.js');
const https = require('https');
const client = require(`../../bot.js`).client;
const config = require(`${process.cwd()}/config.js`);
let db = client.db;

module.exports = {
  name: '/dashboard/server',
  run: async (req, res) => {
    const access_token = req.cookies.access_token;
    const guildsInfo = await db.get(`GuildId_${access_token}`);
    const guildInfos = [];
    if (!guildsInfo) return res.redirect(`/auth`);

    const guildsData = await makeGetRequest('https://discord.com/api/users/@me/guilds', {
          Authorization: `Bearer ${access_token}`,
    });
    const guilds = guildsData;
    for (const guild of guilds) {
        if ((guild.permissions & 8) === 8){

            const formData = {
            guildId: guild.id,
            name: guild.name,
            icon: guild.icon,
            avatar: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`,
            permissions: guild.permissions,
            owner: guild.owner,
            };
            guildInfos.push(formData);
        }
    }

    delete require.cache[require.resolve("../HTML/server.ejs")];

    let args = {
        // guildname: guild.name,
        // guildicon: guildicon,
        guildInfos: guildInfos,
        botname: (await client.user).username,
        botAvatar: client.user.avatarURL(),
        botAvatarURL: client.user.displayAvatarURL({ size: 256 }),
        owner: client.users.cache.get(config.OWNER_ID).username,
        botInvite: `https://discord.com/api/oauth2/authorize?client_id=${config.CLIENT_ID}&permissions=${config.PERMISSIONS}&scope=bot%20applications.commands`,
        serverInvite: config.SUPPORT_SERVER,
    }

    if (access_token) {
      res.render(`HTML/server.ejs`, args); // Pass guildInfos to the template
    } else {
      return res.redirect('/auth');
    }
  },
};

// Function to make HTTP GET request using 'https' module
function makeGetRequest(url, headers) {
    return new Promise((resolve, reject) => {
      const req = https.get(url, { headers }, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(JSON.parse(data)));
      });
  
      req.on('error', (err) => reject(err));
    });
}