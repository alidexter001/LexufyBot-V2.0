const {EmbedBuilder} = require('discord.js');
const config = require(`${process.cwd()}/config.js`)
module.exports = {
    name: 'clear',
    category: '🎵 music',
    description: 'Clear the current server queue',
    run: async(client, message, args) => {
        const response = await clear(client, message, args);
        message.reply(response);
    }
}
async function clear(interaction) {
    const player = client.manager.get(message.guild.id);
    if(!player) return `❌ **| Nothing Is Played Right Now.**`
    const channel = message.member.voice.channel;
    const botChannel = message.guild.members.me.voice.channel;
    if(!channel) return `❌ **| You have to be on a voice channel to use this command.**`
    if(channel && botChannel && botChannel !== channel) return `❌ **| You have to be on the same voice channel as mine to use this command.**`

    const queue = player.queue;
    if(queue.size > 0){
        const embed = new EmbedBuilder()
        .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({dynamic: false})})
        .setColor(config.EMBED_COLORS.BLUE)
        .setDescription(`> 🚮 **Successfully Cleared The Queue.**`)
        .addFields([
            {name: `Requested By:`, value: ("`" + message.member.user.username + "`"), inline: true}
        ])
        queue.clear();
        return {embeds: [embed]}
    }else return `❌ **| The Queue Is Already Empty.**`
}