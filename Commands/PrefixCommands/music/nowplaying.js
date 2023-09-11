const {EmbedBuilder} = require('discord.js');
const config = require(`${process.cwd()}/config.js`);
const {splitBar} =require('string-progressbar');
const msToHms = require('ms-to-hms')

module.exports = {
    name: 'nowplaying',
    category: '🎵 music',
    description: 'Display the current playing song informations',
    run: async(client, message, args) => {
        const response = nowplaying(client, message, args);
        message.reply(response);
    }
}
function nowplaying(client, message, args) {
    const player = client.manager.get(message.guild.id);
    const channel = message.member.voice.channel;
    const botChannel = message.guild.members.me.voice.channel;

    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && channel !== botChannel) return `❌ **| You have to be on the same voice channel as mine to use this command.**`

    const track = player.queue.current;

    const n = track.isStream ? "🔴 LIVE" : new Date(track.duration).toISOString().slice(11, 19);
    const a = new Date(player.position).toISOString().slice(11, 19)
    const embed = new EmbedBuilder()
    .setAuthor({name:'🎶 NowPlaying'})
    .setDescription(`**[${track.title}](${track.uri})**`)
    .addFields([
        {name: '**Duration**', value: track.isStream ? '\`🔴 LIVE\`' : `\`${msToHms(track.duration)}\``, inline: true},
        {name: '**Author**', value: "`" + track.author + "`", inline: true},
        {name: '**Position**', value: "`" + (player.queue.size - 0) + "`", inline: true},
        {name: 'Position', value: ("`"+a+"`") +
        " [" +
        splitBar(track.isStream ? player.position : track.duration, player.position, 15)[0] +
        "] " + ("`"+n+"`"), inline: false},
    ])
    .setColor(config.EMBED_COLORS.GREEN)
    if (typeof track.displayThumbnail === "function") embed.setThumbnail(track.displayThumbnail("hqdefault"))
    return {embeds: [embed]};
}