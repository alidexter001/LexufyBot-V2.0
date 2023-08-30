const { EmbedBuilder } = require('discord.js');
const config = require(`${process.cwd()}/config.js`);

module.exports = {
    name: 'previous',
    category: '🎵 music',
    description: 'play the previous song',
    run: async(client, message, args) => {
        const response = previous(client, message, args);
        message.reply(response);
    }
}
function previous(client, message, args) {
    const player = client.manager.get(message.guild.id);
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    const channel = message.member.voice.channel;
    const botChannel = message.guild.members.me.voice.channel;
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && botChannel !== channel) return `❌ **| You have to be on the same voice channel as mine to use this command.**`

    try{
        const currentSong = player.queue.current;
        if(!player.queue.previous) return `❌ **| There is no previous played songs on this queue**`
        if (currentSong) player.queue.unshift(currentSong);
        player.play(player.queue.previous);

        const embed = new EmbedBuilder()
        .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({dynamic: false})})
        .setColor(config.EMBED_COLORS.BLUE)
        .setDescription(`> ⏪ **Successfully returned to the previous song**`)
        .addFields([
            {name: `Requested By:`, value: ("`" + message.member.user.username + "`"), inline: true}
        ])

        return {embeds: [embed]}

    }catch{return `❌ **| Something Went Wrong.**`}
}