const {EmbedBuilder} = require('discord.js');
const config = require(`${process.cwd()}/config.js`);

module.exports ={
    name: 'skip',
    category: '🎵 music',
    description: 'Skip to the next song in the queue',
    run: async(client, message, args) => {
        const response = skip(client, message, args)
        message.reply(response);
    }
}
function skip(client, message, args) {
    const player = client.manager.get(message.guild.id);
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    const channel = message.member.voice.channel;
    const botChannel = message.guild.members.me.voice.channel;
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && botChannel !== channel) return `❌ **| You have to be on the same voice channel as mine to use this command.**`

    player.stop();
    const embed = new EmbedBuilder()
    .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({dynamic: false})})
    .setColor(config.EMBED_COLORS.BLUE)
    .setDescription(`> ⏩ **Skipped To The Next Track Successfully.**`)
    .addFields([
        {name: `Requested By:`, value: ("`" + message.member.user.username + "`"), inline: true}
    ])
    return {embeds: [embed]}
}