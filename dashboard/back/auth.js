const OAuth = require('oauth');
const https = require('https');
const config = require(`${process.cwd()}/config.js`);
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const client = require(`${process.cwd()}/bot.js`).client;
let db = client.db;
// Create an OAuth client
const oauth2 = new OAuth.OAuth2(
  config.DASHBOARD.CLIENT_ID,
  config.DASHBOARD.CLIENT_SECRET,
  'https://discord.com',
  '/api/oauth2/authorize',
  '/api/oauth2/token',
  null
);

module.exports = {
  name: '/auth',
  run: async (req, res) => {
    app.use(cookieParser());
    const authorizationUri = oauth2.getAuthorizeUrl({
      redirect_uri: `${config.DASHBOARD.dashboardURL}:${config.DASHBOARD.PORT}/auth`,
      scope: 'identify guilds',
      response_type: 'code',
    });

    // Check if the user is already authenticated
    if (!req.query.code) {
      // If not authenticated, redirect to the authorization URL
      res.redirect(authorizationUri);
      return;
    }

    try {
      const code = req.query.code;

      oauth2.getOAuthAccessToken(code, {
        grant_type: 'authorization_code',
        redirect_uri: `${config.DASHBOARD.dashboardURL}:${config.DASHBOARD.PORT}/auth`,
      }, async (err, accessToken) => {
        if (err) {
          res.status(500).send('Failed to authenticate user, please try again.');
          return;
        }

        // Fetch the user's profile information from Discord using the access token
        const userData = await makeGetRequest('https://discord.com/api/users/@me', {
          Authorization: `Bearer ${accessToken}`,
        });

        // Fetch the user's guilds using the access token
        const guildsData = await makeGetRequest('https://discord.com/api/users/@me/guilds', {
          Authorization: `Bearer ${accessToken}`,
        });

        // Here, you can perform further operations with the user and guilds data.
        // For security, you should store the access token securely and handle it properly in subsequent requests.

        // Redirect the user to a success page or do whatever you need to do next.
        //console.log(guildsData)
        const user = userData;
        const guilds = guildsData;
        for (const guild of guilds) {
          const formData = {
            guildId: guild.id,
            name: guild.name,
            icon: guild.icon,
            permissions: guild.permissions,
            owner: guild.owner,
          };
          await db.set(`UserId_${accessToken}`, user)
          await db.set(`GuildId_${accessToken}.${formData.guildId}`, formData);
        }
        res.cookie('access_token', accessToken, { maxAge: 60 * 1000 * 60 * 24 });
        res.redirect(`/dashboard`);
        module.exports.accessToken = accessToken;
      });
    } catch (err) {
      res.status(500).send('Failed to authenticate user, please try again.');
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
