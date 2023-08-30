const client = require(`${process.cwd()}/bot.js`).client;
let db = client.db;
module.exports = {
    name: '/logout',
    run: async(req, res) => {
        delete require.cache[require.resolve("../HTML/dashboard.ejs")];
        const access_token = req.cookies.access_token

        await db.delete(`UserId_${access_token}`)
        await db.delete(`GuildId_${access_token}`)
        res.cookie('access_token', '', { expires: new Date(0) });
        res.redirect(`/home`)
    }
}