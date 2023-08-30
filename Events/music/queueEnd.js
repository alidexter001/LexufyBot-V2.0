const { MUSIC } = require(`${process.cwd()}/config.js`);
const client = require(`${process.cwd()}/bot.js`).client;
const {EmbedBuilder} = require('discord.js');
const config = require(`${process.cwd()}/config`);

module.exports = async(player, track) =>{
    const channel = client.channels.cache.get(player.textChannel);
    let embed = new EmbedBuilder()
    .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({dynamic: false})})
    .setDescription(`> ✅ **| Queue End.** \n **Hope you did enjoy your session.**`)
    .setColor(config.EMBED_COLORS.RED);

    channel.send({embeds: [embed]});
    if(!MUSIC.A24) {
        setTimeout(() =>{
            if(player.state === 'CONNECTED' && player.queue.size === 0 && !player.playing) player.destroy();
        }, MUSIC.IDLE_TIME * 1000)
    }
}

