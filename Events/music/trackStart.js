const client = require(`${process.cwd()}/bot.js`).client;
const {EmbedBuilder} = require('discord.js');
const config = require(`${process.cwd()}/config.js`);
const msToHms = require('ms-to-hms')
module.exports = async(player, track) => {
    const embeded = new EmbedBuilder()
    .setTitle(`🎶 PLAYING`)
    if (typeof track.displayThumbnail === "function") 
        embeded.setThumbnail(track.displayThumbnail("hqdefault"))
    .setDescription(`**[${track.title}](${track.uri})**`)
    .addFields([
        {name: '**Duration**', value: track.isStream ? '\`🔴 LIVE\`' : `\`${msToHms(track.duration)}\``, inline: true},
        {name: '**Author**', value: "`" + track.author + "`", inline: true},
        {name: '**Position**', value: "`" + (player.queue.size - 0) + "`", inline: true},
    ])
    .setColor(config.EMBED_COLORS.GREEN)
    if(track.requester !== 'From Dashboard'){
        
        embeded.setFooter({text: `Requested By: ${track.requester.user.username}`,iconURL: track.requester.displayAvatarURL({dynamic: true})})
    }else{
        embeded.setFooter({text: `Requested From The Dashboard`})
    }
    await client.channels.cache
      .get(player.textChannel)
      .send({embeds: [embeded]});
}