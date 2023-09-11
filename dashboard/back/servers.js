const client = require(`../../bot.js`).client;
const config  = require(`${process.cwd()}/config.js`)
const msToHms = require('ms-to-hms')
let db = client.db;
const express = require('express');
const app = express();
module.exports = {
    name: '/dashboard/servers',
    run: async(req, res) => {
        delete require.cache[require.resolve("../HTML/servers.ejs")];

        const access_token = await req.cookies.access_token
    
        const guildId = req.query.id;

        const link = `https://discord.com/api/oauth2/authorize?client_id=${config.CLIENT_ID}&permissions=${config.PERMISSIONS}&scope=bot%20applications.commands&guild_id=${guildId}&disable_guild_select=true`
        if(!await db.get(`UserId_${access_token}`)) res.redirect('/auth');
        if(!guildId) return res.redirect('/dashboard/server');
        if(!client.guilds.cache.get(guildId)) return res.redirect(link)
           
        
        let guild = await db.get(`GuildId_${access_token}.${guildId}`);
        let guildicon; 
        if(guild && guild.icon && guild.icon.length > 0){
            guildicon =`https://cdn.discordapp.com/icons/${guildId}/${guild.icon}.png`;
        } else {
            guildicon = 'https://i.imgur.com/IaxoqUW.png';
        }
        let songinqueue;
        let loopqueue;
        let looptrack;
        let songcurrent;
        let songcurrenturi;
        let duration;
        let songauthor;
        let antiinvite = await client.db.get(`${guildId}.automod.antiinvite.status`);
        let antighost = await client.db.get(`${guildId}.automod.antighost.status`);
        let antiping = await client.db.get(`${guildId}.automod.antiping.status`);
        let antiscam = await client.db.get(`${guildId}.automod.antiscam.status`);
        let antilink = await client.db.get(`${guildId}.automod.antilink.status`);
        let prefix = await db.get(`${guildId}.prefix`);
        const player = await client.manager.get(guildId)
        if(player && player.playing ){
            songinqueue = await player.queue.size + 1;
            loopqueue = player.queueRepeat ? 'Enabled' : 'Disabled';
            loopqueuestatus = player.queueRepeat,
            looptrack = player.trackRepeat ? 'Enabled' : 'Disabled';
            looptrackstatus = player.trackRepeat
            songcurrent = player.queue.current.title;
            songcurrenturi = player.queue.current.uri;
            songauthor = player.queue.current.author;
            duration = await player.queue.current.isStream ? '🔴 LIVE': `${msToHms(player.queue.current.duration)}`;
        }  
        let args = {
            guildname: guild.name,
            guildicon: guildicon,
            songinqueue: songinqueue || 0,
            loopqueue: loopqueue || 'Disabled',
            looptrack: looptrack || 'Disabled',
            songcurrent: songcurrent|| 'Nothing Playing Right Now',
            songcurrenturi: songcurrenturi || '',
            songauthor: songauthor || 'nothing playing right now',
            duration: duration || '00:00:00',
            prefix: prefix || config.PREFIX,
            botname: (await client.user).username,
            botAvatar: client.user.avatarURL(),
            botAvatarURL: client.user.displayAvatarURL({ size: 256 }),
            owner: client.users.cache.get(config.OWNER_ID).username,
            botInvite: `https://discord.com/api/oauth2/authorize?client_id=${config.CLIENT_ID}&permissions=${config.PERMISSIONS}&scope=bot%20applications.commands`,
            serverInvite: config.SUPPORT_SERVER,
            antiinvite: antiinvite ? 'Enabled' : 'Disabled',
            antiinviteStatus: antiinvite,
            antighost: antighost ? 'Enabled' : 'Disabled',
            antighostStatus: antighost,
            antiping: antiping ? 'Enabled' : 'Disabled',
            antipingStatus: antiping,
            antiscam: antiscam ? 'Enabled' : 'Disabled',
            antiscamStatus: antiscam,
            antilink: antilink ? 'Enabled' : 'Disabled',
            antilinkStatus: antilink,
            guildId: guildId,
            db: db,
            player: player

        }
        if(access_token)
            res.render(`HTML/servers.ejs`, args);
        else return res.redirect('/auth');
    }
}